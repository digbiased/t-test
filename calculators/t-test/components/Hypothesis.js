import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

function oneSampleHypothesis(data, sides, statistic) {
  const comparator = sides === 2 ? '≠' : '>';
  const sign = statistic === 'proportions' ? 'π' : 'μ';
  const hypothetical = statistic === 'proportions' ? data.hypothetical_proportion : data.hypothetical_mean;

  return (
    <>
      <Typography variant="body2">
        <i>
          H<sub>0</sub>: {sign}
          <sub>1</sub> = {sign}
          <sub>h</sub>
        </i>{' '}
        : {statistic === 'proportions' ? 'deleža sta enaka' : 'povprečji sta enaki'}
      </Typography>
      <Typography variant="body2">
        <i>
          H<sub>1</sub>: {sign}
          <sub>1</sub> {comparator} {sign} <sub>h</sub>
        </i>
        :{' '}
        {statistic === 'proportions'
          ? sides === 2
            ? 'deleža se razlikujeta'
            : 'prvi delež je večji od drugega'
          : sides === 2
          ? 'povprečji se razlikujeta'
          : 'prvo povprečje je večje od drugega'}
      </Typography>
    </>
  );
}

function twoSampleHypothesis(data, sides, statistic) {
  const comparator = sides === 2 ? '≠' : '>';
  const sign = statistic === 'proportions' ? 'π' : 'μ';
  const sampleStatistic = statistic === 'proportions' ? 'proportion' : 'mean';
  const samplesData = [data.samples[0][sampleStatistic], data.samples[1][sampleStatistic]];
  return (
    <>
      <Typography variant="body2">
        <i>
          H<sub>0</sub>: {sign}
          <sub>0</sub> = {sign}
          <sub>1</sub>
        </i>{' '}
        : {statistic === 'proportions' ? 'deleža sta enaka' : 'povprečji sta enaki'}
      </Typography>

      <Typography variant="body2">
        <i>
          H<sub>1</sub>: {sign}
          <sub>0</sub> {comparator} {sign}
          <sub>1</sub>
        </i>{' '}
        :{' '}
        {statistic === 'proportions'
          ? sides === 2
            ? 'deleža se razlikujeta'
            : 'prvi delež je večji od drugega'
          : sides === 2
          ? 'povprečji se razlikujeta'
          : 'prvo povprečje je večje od drugega'}
      </Typography>
    </>
  );
}

function Hypothesis(props) {
  const { data, sides, statistic } = props;
  return (
    <>
      <Typography variant="h6">Domnevi</Typography>
      {props.samples === 1 ? oneSampleHypothesis(data, sides, statistic) : twoSampleHypothesis(data, sides, statistic)}
    </>
  );
}

Hypothesis.propTypes = {
  statistic: PropTypes.oneOf(['means', 'proportions']).isRequired,
  sides: PropTypes.oneOf([1, 2]).isRequired,
  samples: PropTypes.oneOf([1, 2]).isRequired,
  data: PropTypes.object
};

export default Hypothesis;
