import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import PhoneRow from './tel-input';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 16,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
});

class MultiPhoneInput extends Component {
  constructor(props) {
    super(props);
    let initialPhones;
    let initialTypes;
    if (props.phones && props.phones.length > 0) {
      initialPhones = props.phones;
      initialTypes = props.types.map((type) => {
        const typeUsed = props.phones.find(phone => phone.type === type);
        return { name: type, available: !typeUsed };
      });
    } else {
      initialPhones = [{ num: '', type: props.types[0] }];
      initialTypes = props.types.map(t => ({ name: t, available: t !== props.types[0] }));
    }

    this.state = {
      phones: initialPhones,
      types: initialTypes,
    };
  }

  onNumChanged(event, index) {
    const newValue = event.target.value;
    this.setState((previousState) => {
      const phonesUpdated = previousState.phones.map((p, i) => {
        if (index !== i) return p;
        return { ...p, num: newValue };
      });

      if (this.props.onPhonesChange) this.props.onPhonesChange(phonesUpdated);

      return { phones: phonesUpdated };
    });
  }

  onTypeChanged(event, index) {
    const newValue = event.target.value;
    this.setState((previousState) => {
      const phoneToUpdate = previousState.phones[index];
      const phonesUpdated = previousState.phones.map((p, i) => {
        if (index !== i) return p;
        return { ...p, type: newValue };
      });
      const typesUpdated = previousState.types.map((t) => {
        if (t.name === phoneToUpdate.type) return { ...t, available: true };
        if (t.name === newValue) return { ...t, available: false };
        return t;
      });

      if (this.props.onPhonesChange) this.props.onPhonesChange(phonesUpdated);

      return { phones: phonesUpdated, types: typesUpdated };
    });
  }

  addPhone() {
    this.setState((previousState) => {
      const nextType = previousState.types.find(t => t.available === true);
      if (!nextType) return null;
      const typesUpdated = previousState.types.map((t) => {
        if (t.name !== nextType.name) return t;
        return { ...t, available: false };
      });

      const phonesUpdated = [...previousState.phones, { num: '', type: nextType.name }];

      if (this.props.onPhonesChange) this.props.onPhonesChange(phonesUpdated);

      return {
        types: typesUpdated,
        phones: phonesUpdated,
      };
    });
  }

  removePhone(event, index) {
    this.setState((previousState) => {
      const phoneToRemove = previousState.phones[index];
      const phonesUpdated = previousState.phones.filter(p => p.type !== phoneToRemove.type);
      const typesUpdated = previousState.types.map((t) => {
        if (t.name !== phoneToRemove.type) return t;
        return { ...t, available: true };
      });

      if (this.props.onPhonesChange) this.props.onPhonesChange(phonesUpdated);

      return {
        phones: phonesUpdated,
        types: typesUpdated,
      };
    });
  }

  log() {
    console.log('Phones Registered', this.state.phones);
  }

  render() {
    return (
      <Grid container className={this.props.classes.root} direction="column" spacing={16} justify="center" alignItems="center">
        <Grid item xs >
          <Grid container direction="column" justify="center" alignItems="flex-start" spacing={16}>
            {this.state.phones.map((p, idx) => (<PhoneRow
              classes={this.props.classes}
              key={idx}
              types={this.state.types}
              phone={p}
              onNumChanged={(event, index) => this.onNumChanged(event, index)}
              onTypeChanged={(event, index) => this.onTypeChanged(event, index)}
              removePhone={(event, index) => this.removePhone(event, index)}
              index={idx}
            />))}
          </Grid>
        </Grid>
        <Grid item xs >
          <Grid container direction="row" alignItems="center" spacing={16}>
            <Grid item xs >
              <Button color="primary" onClick={() => this.log()}>Log</Button>
            </Grid>
            <Grid item xs >
              <Button raised color="primary" onClick={() => this.addPhone()}>Add Another</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

MultiPhoneInput.defaultProps = {
  types: ['Home', 'Mobile', 'Work', 'Others'],
};

MultiPhoneInput.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string),
  onPhonesChange: PropTypes.func.isRequired,
  phones: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (!propValue[key].hasOwnProperty('num') || !propValue[key].hasOwnProperty('type')) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}. Use the format [{num: '1234567', type: 'Mobile'}]`);
    }
    return null;
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(MultiPhoneInput);
