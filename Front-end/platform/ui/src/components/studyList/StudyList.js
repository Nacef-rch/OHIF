import './StudyList.styl';
import {Route  } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import TableSearchFilter from './TableSearchFilter.js';
import PropTypes from 'prop-types';
import { StudyListLoadingText } from './StudyListLoadingText.js';
import { useTranslation } from 'react-i18next';
import {Icon} from '@ohif/ui'

const getContentFromUseMediaValue = (
  displaySize,
  contentArrayMap,
  defaultContent
) => {
  const content =
    displaySize in contentArrayMap
      ? contentArrayMap[displaySize]
      : defaultContent;

  return content;
};
/**
 *
 *
 * @param {*} props
 * @returns
 */
function StudyList(props) {
  const {
    isLoading,
    hasError,
    studies2,
    studies,
    long,
    sort,
    onSort: handleSort,
    filterValues,
    onFilterChange: handleFilterChange,
    onSelectItem: handleSelectItem,
    onSelectItem2: handleSelectItem2,
    studyListDateFilterNumDays,
    displaySize,
  } = props;
  const { t, ready: translationsAreReady } = useTranslation('StudyList');

  const largeTableMeta = [
    {
      displayText: t('Search'),
      fieldName: 'allFields',
      inputType: 'text',
      size: 100,
    },
  
   
  ];

  const mediumTableMeta = [
   {
      displayText: t('Search'),
      fieldName: 'allFields',
      inputType: 'text',
      size: 100,
    },
  ];

  const smallTableMeta = [
    {
      displayText: t('Search'),
      fieldName: 'allFields',
      inputType: 'text',
      size: 100,
    },
  ];

 
  const tableMeta = getContentFromUseMediaValue(
    displaySize,
    { large: largeTableMeta, medium: mediumTableMeta, small: smallTableMeta },
    smallTableMeta
  );

 

  const totalSize = tableMeta
    .map(field => field.size)
    .reduce((prev, next) => prev + next);

  return translationsAreReady ? (
    <div className="table table--striped table--hoverable">
      <div>
        {tableMeta.map((field, i) => {
          const size = field.size;
          const percentWidth = (size / totalSize) * 100.0;

          return <div key={i} style={{ width: `${percentWidth}%` }} />;
        })}
      </div>
      <div className=" table-head">
        <div className="align-head">
          <div className="long">

          <label >{long} PATIENTS </label>
          </div>
          <div className='input-align'>
          <TableSearchFilter
            meta={tableMeta}
            values={filterValues}
            onSort={handleSort}
            onValueChange={handleFilterChange}
            sortFieldName={sort.fieldName}
            sortDirection={sort.direction}
            studyListDateFilterNumDays={studyListDateFilterNumDays}
          />

          <Route render={({ history}) => (
           <button className='btn-study'onClick={() => { history.push('/add-patient') }} ><Icon className='icon' name='plus' />Patient</button>
           )} />
           </div>
         
        </div>
        
      </div>
      <div className='hr'></div>
      <div className="card" data-cy="study-list-results">
        {/* I'm not in love with this approach, but it's the quickest way for now
         *
         * - Display different content based on loading, empty, results state
         *
         * This is not ideal because it create a jump in focus. For loading especially,
         * We should keep our current results visible while we load the new ones.
         */}
        {/* LOADING */}
        {isLoading && (
          <div className="no-hover">
            <div colSpan={tableMeta.length}>
              <StudyListLoadingText />
            </div>
          </div>
        )}
        {!isLoading && hasError && (
          <div className="no-hover">
            <div colSpan={tableMeta.length}>
              <div className="notFound">
                {t('There was an error fetching studies')}
              </div>
            </div>
          </div>
        )}

        {!isLoading &&
          studies2.map((study, index) => (
            <TableRow
              key={`${index}`}
              onClick={StudyInstanceUID => handleSelectItem2(StudyInstanceUID)}
              AccessionNumber={study.AccessionNumber || ''}
              modalities={study.modalities || ''}
              PatientID={study.id || ''}
              PatientName={study.nom || ''}
              StudyDate={study.StudyDate || ''}
              series={study.imageList || '' }
              StudyDescription={study.description || ''}
              StudyInstanceUID={study.id}
              displaySize={displaySize}
            />
          ))}
        {/* EMPTY */}
        {!isLoading && !studies.length && !studies2.length &&(
          <div className="no-hover">
            <div colSpan={tableMeta.length}>
              <div className="notFound">{t('No matching results')}</div>
            </div>
          </div>
        )}
        {!isLoading &&
          studies.map((study, index) => (
            <TableRow
              key={`${study.StudyInstanceUID}-${index}`}
              onClick={StudyInstanceUID => handleSelectItem(StudyInstanceUID)}
              AccessionNumber={study.AccessionNumber || ''}
              modalities={study.modalities}
              PatientID={study.PatientID || ''}
              PatientName={study.PatientName || ''}
              StudyDate={study.StudyDate}
              series={study.Series}
              StudyDescription={study.StudyDescription || ''}
              StudyInstanceUID={study.StudyInstanceUID}
              displaySize={displaySize}
            />
          ))}
         


      </div>
    </div>
  ) : null;
}

StudyList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  studies: PropTypes.array.isRequired,
  studies2: PropTypes.any.isRequired,
  onSelectItem: PropTypes.func.isRequired,
   onSelectItem2: PropTypes.func.isRequired,
  // ~~ SORT
  sort: PropTypes.shape({
    fieldName: PropTypes.string,
    direction: PropTypes.oneOf(['desc', 'asc', null]),
  }).isRequired,
  onSort: PropTypes.func.isRequired,
  // ~~ FILTERS
  filterValues: PropTypes.shape({
    PatientName: PropTypes.string.isRequired,
    PatientID: PropTypes.string.isRequired,
    AccessionNumber: PropTypes.string.isRequired,
    StudyDate: PropTypes.string.isRequired,
    modalities: PropTypes.string.isRequired,
    StudyDescription: PropTypes.string.isRequired,
    patientNameOrId: PropTypes.string.isRequired,
    Series: PropTypes.any,
    accessionOrModalityOrDescription: PropTypes.string.isRequired,
    allFields: PropTypes.string.isRequired,
    studyDateTo: PropTypes.any,
    studyDateFrom: PropTypes.any,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  studyListDateFilterNumDays: PropTypes.number,
  displaySize: PropTypes.string,
};

StudyList.defaultProps = {};

function TableRow(props) {
  const {
    AccessionNumber,
    isHighlighted,
    modalities,
    PatientID,
    PatientName,
    StudyDate,
    Series,
    StudyDescription,
    StudyInstanceUID,
    onClick: handleClick,
    displaySize,
  } = props;

  const { t } = useTranslation('StudyList');

  const largeRowTemplate = (
    <div
      onClick={() => handleClick(StudyInstanceUID)}
      className={classNames({ active: isHighlighted })}

    >
      <div className={classNames({ 'empty-value': !PatientName })}>
        {PatientName || `(${t('Empty')})`}
      </div>
      <div>{PatientID}</div>
      <div>{AccessionNumber}</div>
      <div>{StudyDate}</div>
      <div className={classNames({ 'empty-value': !modalities })}>
        {modalities || `(${t('Empty')})`}
      </div>
      <div>{StudyDescription}</div>
    </div>
  );

  const mediumRowTemplate = (
    <div
      onClick={() => handleClick(StudyInstanceUID)}
      className="card-body"

    >
      <img src="https://www.imageriemedicalemc3.fr/wp-content/uploads/2017/09/crane-1-300x297.jpg" height='180' style={{width:'100%;'}}/>
      <div className='align-t' >
        <label>Patient Name :</label>
        {PatientName || `(${t('Empty')})`}
 <div><label>Patient ID :</label>{PatientID}</div>

      </div>
      <div>



      </div>

      {/* DATE */}

    </div>
  );

  const smallRowTemplate = (
    <div
      onClick={() => handleClick(StudyInstanceUID)}
      className={classNames({ active: isHighlighted })}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* NAME AND ID */}
          <div
            className={classNames({ 'empty-value': !PatientName })}
            style={{ width: '150px', minWidth: '150px' }}
          >
            <div style={{ fontWeight: 500, paddingTop: '3px' }}>
              {PatientName || `(${t('Empty')})`}
            </div>
            <div style={{ color: '#60656f' }}>{PatientID}</div>
          </div>

          {/* DESCRIPTION */}
          <div
            className="hide-xs"
            style={{
              whiteSpace: 'pre-wrap',
              flexGrow: 1,
              paddingLeft: '35px',
            }}
          >
            {StudyDescription}
          </div>

          {/* MODALITY & DATE */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '80px',
              width: '80px',
            }}
          >
            <div
              className={classNames({
                modalities: modalities,
                'empty-value': !modalities,
              })}
              aria-label={modalities}
              title={modalities}
            >
              {modalities || `(${t('Empty')})`}
            </div>
            <div>{StudyDate}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const rowTemplate = getContentFromUseMediaValue(
    displaySize,
    {
      large: mediumRowTemplate,
      medium: mediumRowTemplate,
      small: mediumRowTemplate,
    },
    smallRowTemplate
  );

  return rowTemplate;
}

TableRow.propTypes = {
  AccessionNumber: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  modalities: PropTypes.string,
  PatientID: PropTypes.string.isRequired,
  PatientName: PropTypes.string.isRequired,
  StudyDate: PropTypes.string.isRequired,
  StudyDescription: PropTypes.string.isRequired,
  StudyInstanceUID: PropTypes.string.isRequired,
  displaySize: PropTypes.string,
};

TableRow.defaultProps = {
  isHighlighted: false,
};

export {StudyList};
