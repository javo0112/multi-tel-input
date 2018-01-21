# multi-tel-input Sample

Sample project for React component multi-tel-input, a form component to enter multiple phone numbers.

## Run the demo

yarn install && yarn start

## Usage

```js
// Initial data
this.state = { phones: [{ num: '(999) 315-4885', type: 'Mobile' }] };

// Define a change handler for the component
handlePhonesChange(newPhones) {
    this.setState({ phones: newPhones });
}
  
// Pass the available phone types to pick and a handler to receive the updated list of phones
<MultiPhoneInput
        phones={this.state.phones}
        types={['Home', 'Mobile', 'Work', 'Other']}
        onPhonesChange={this.handlePhonesChange}
        />
 ```
