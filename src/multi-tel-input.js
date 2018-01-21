import React, { Component, button } from 'react';

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
        return (
            <span>
                <ul> 
                    {this.state.phones.map((p, idx) => {
                        return  <PhoneRow 
                                    key={ idx }
                                    types={ this.state.types } 
                                    phone={p} 
                                    onNumChanged={ this.onNumChanged }
                                    onTypeChanged={ this.onTypeChanged }
                                    removePhone = { this.removePhone }
                                    index={ idx }
                                />;
                    })} 
                </ul>
                <button onClick={ this.log }>Log</button>
                <button onClick={ this.addPhone }>Add Another</button>
            </span>
        );
    }
}

class PhoneRow extends Component {
    render() {
        return (
            <li>
                <select value={ this.props.phone.type } onChange={ this.props.onTypeChanged(this.props.index) } >
                    {this.props.types.map((t) => {
                        return <option disabled={ !t.available } key={ t.name } value={ t.name }>{ t.name }</option>
                    })}
                </select> 
                <input type="text" value={ this.props.phone.num } onChange={ this.props.onNumChanged(this.props.index) } /> 
                { this.props.index !== 0 && <button onClick={ this.props.removePhone(this.props.index) } >Remove</button> }
            </li>
        );
    }
}

export default MultiPhoneInput;