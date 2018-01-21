import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });


class MultiPhoneInput extends Component {
    constructor(props) {
        super(props);
        var initialPhones;
        var initialTypes;
        if (props.phones && props.phones.length > 0) {
            initialPhones = props.phones;
            initialTypes = props.types.map(type => {
                var typeUsed = props.phones.find(phone => phone.type === type );
                return {name: type, available: typeUsed ? false : true }
            })
        } else {
            initialPhones = [{num: '', type: props.types[0]}];
            initialTypes = props.types.map(t => ({name: t, available: t !== props.types[0] }))
        }
        
        this.state = {
            phones: initialPhones,
            types: initialTypes
        }

        // Functions defined
        this.addPhone = this.addPhone.bind(this);
        this.removePhone = this.removePhone.bind(this);
        this.log = this.log.bind(this);
        this.onNumChanged = this.onNumChanged.bind(this);
        this.onTypeChanged = this.onTypeChanged.bind(this);
    }

    addPhone() {
        this.setState(previousState => {        
            var nextType = previousState.types.find(t => t.available === true);
            if (!nextType) return;
            var typesUpdated = previousState.types.map(t => {
                if (t.name !== nextType.name) return t;
                return { ...t, available: false };
            });

            var phonesUpdated = [ ...previousState.phones, {num: '', type: nextType.name}];
            this.props.onPhonesChange(phonesUpdated);

            return ({ 
                types: typesUpdated,
                phones: phonesUpdated,
            });
    })}

    removePhone = (index) => (event) => {
        this.setState(previousState => {
            var phoneToRemove = previousState.phones[index];
            var phonesUpdated = previousState.phones.filter(p => p.type !== phoneToRemove.type)
            var typesUpdated = previousState.types.map(t => {
                if (t.name !== phoneToRemove.type) return t;
                return { ...t, available: true };
            });
            this.props.onPhonesChange(phonesUpdated);
            return ({
                phones: phonesUpdated,
                types: typesUpdated,
            });  
        });
    }

    log() {
        console.log("Phones Registered", this.state.phones);
    }

    onNumChanged = (index) => (event) => {
        var newValue = event.target.value;
        this.setState(previousState => {
            
            var phonesUpdated = previousState.phones.map((p, i) => {
                if(index !== i) return p;
                return { ...p, num: newValue };
            });
            this.props.onPhonesChange(phonesUpdated);
            return { phones: phonesUpdated };
        });
    }

    onTypeChanged = (index) => (event) => {
        var newValue = event.target.value;
        this.setState(previousState => {
            var phoneToUpdate = previousState.phones[index];
            var phonesUpdated = previousState.phones.map((p, i) => {
                if(index !== i) return p;
                return { ...p, type: newValue };
            });
            var typesUpdated = previousState.types.map(t => {
                if (t.name === phoneToUpdate.type) return {...t , available: true};
                if (t.name === newValue) return { ...t, available: false};
                return t;
            });
            this.props.onPhonesChange(phonesUpdated);
            return { phones: phonesUpdated, types: typesUpdated };
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} direction="column" spacing={16} justify="center" alignItems="center">
                <Grid item xs >
                    <Grid container direction="column" justify="center" alignItems="center" spacing={16}> 
                        {this.state.phones.map((p, idx) => {
                            return  <PhoneRow
                                        classes = {classes}
                                        key={ idx }
                                        types={ this.state.types } 
                                        phone={p} 
                                        onNumChanged={ this.onNumChanged }
                                        onTypeChanged={ this.onTypeChanged }
                                        removePhone = { this.removePhone }
                                        index={ idx }
                                    />;
                        })} 
                    </Grid>
                </Grid>
                <Grid item xs >    
                    <Grid container direction="row" alignItems="center" spacing={16}>
                        <Grid item xs > 
                            <Button style={{heigh: 60}} color="primary" onClick={ this.log }>Log</Button>
                        </Grid>
                        <Grid item xs > 
                            <Button raised color="primary" onClick={ this.addPhone }>Add Another</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

class PhoneRow extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs >
                <Grid container className={classes.root} direction="row" justify="flex-start" alignItems="center" spacing={8}>
                    <Grid item xs > 
                        <Select value={ this.props.phone.type } onChange={ this.props.onTypeChanged(this.props.index) } >
                            {this.props.types.map((t) => {
                                return <MenuItem disabled={ !t.available } key={ t.name } value={ t.name }>{ t.name }</MenuItem>
                            })}
                        </Select> 
                    </Grid>
                    <Grid item xs >
                        <TextField className={classes.textField} type="text" margin="normal" value={ this.props.phone.num } onChange={ this.props.onNumChanged(this.props.index) } /> 
                    </Grid>
                    { this.props.index !== 0 && <Grid item xs ><IconButton onClick={ this.props.removePhone(this.props.index) } ><DeleteIcon/></IconButton></Grid> }
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MultiPhoneInput);