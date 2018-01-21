import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import TextMask from './tel-mask';

class PhoneRow extends Component {
  render() {
    const {
      index,
      classes,
      types,
      phone,
      removePhone,
      onTypeChanged,
      onNumChanged,
    } = this.props;
    return (
      <Grid item xs >
        <Grid container className={classes.root} direction="row" justify="flex-start" alignItems="center" spacing={8}>
          <Grid item >
            <Select className={classes.select} value={phone.type} onChange={onTypeChanged(index)} >
              {types.map(t =>
                <MenuItem disabled={!t.available} key={t.name} value={t.name}>{ t.name }</MenuItem>)
              }
            </Select>
          </Grid>
          <Grid item >
            <Input
              className={classes.textField}
              type="text"
              inputComponent={TextMask}
              value={phone.num}
              onChange={onNumChanged(this.props.index)}
            />
          </Grid>
          { index !== 0 &&
            <Grid item xs >
              <IconButton onClick={removePhone(index)} >
                <DeleteIcon />
              </IconButton>
            </Grid> }
        </Grid>
      </Grid>
    );
  }
}

PhoneRow.defaultProps = {
  types: [{ name: 'Home', available: true }],
  phone: { num: '', type: 'Home' },
};

PhoneRow.propTypes = {
  index: PropTypes.number.isRequired,
  phone: PropTypes.shape({
    num: PropTypes.string,
    type: PropTypes.string,
  }),
  removePhone: PropTypes.func.isRequired,
  onTypeChanged: PropTypes.func.isRequired,
  onNumChanged: PropTypes.func.isRequired,
  types: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (!propValue[key].hasOwnProperty('name') || !propValue[key].hasOwnProperty('available')) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}. Use the format [{name: 'Home', available: true}]`);
    }
  }),
  classes: PropTypes.shape({
    root: PropTypes.string,
    select: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

export default PhoneRow;
