'use strict';

const e = React.createElement;

class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {a_text: "", street: "", city: "", state_abv: "", postal: "",};
        this.inputFieldRef = React.createRef();
    }

    render() {
        if (this.state.liked) {
            return 'You liked comment number ' + this.props.commentID;
        }

        return (
            <div className="row">
                <div id="input_side" className="col">
                    <h2 className="a_header">Input</h2>
                    <input ref={this.inputFieldRef} id="addr_input" type="text" onChange={this.updateInputValue.bind(this)}/>
                    <button onClick={this.clearAddress.bind(this)}>Clear</button>
                    <h3 id="addr_output">{this.state.a_text}</h3>
                </div>
                <div id="output_side" className="col">
                    <h2 className="a_header">Output</h2>
                    <h4 id="street">{this.state.street}</h4>
                    <h4 id="city">{this.state.city}</h4>
                    <h4 id="state_abv">{this.state.state_abv}</h4>
                    <h4 id="postal">{this.state.postal}</h4>
                </div>
            </div>
        );
    }


    clearAddress(event) {
        this.inputFieldRef.current.value = "";
        this.setState({a_text: "", street: "", city: "", state_abv: "", postal: ""});
    }

    updateInputValue(event) {
        var addr_text = event.target.value;

        var street_temp = "";
        var city_temp = "";
        var state_abv_temp = "";
        var postal_temp = "";

        if (addr_text) {
            // var a_regex = /^\s*([^,.]+(?:\s+\S+)*)[,.]*\s+(?:([^,.]+)\s*[,. ]\s*([A-Z]{2})[,. ]*|([^,.]+)\s*([A-Z]{2})[,. ]*)\s*([0-9]+)/i;
            var a_regex = /^\s*(.*(?:\s+\S+)*(?:Road|Rd|Street|St|Drive|Dr|Avenue|Ave|Av|Lane|Ln|Parkway|Pkwy|Plaza|Plz|Route|Rte|Boulevard|Blvd|Terrace|Ter|Circle|Cir))[,.]*\s+(?:([^,.]+)\s*[,. ]\s*([A-Z]{2})[,. ]*\s*([0-9]+)|([^,.]+)\s*[,. ]\s*([A-Z]*)[,. ]+\s*([0-9]+))/i;
            var addr_array = a_regex.exec(addr_text);

            if (addr_array != null) {
                street_temp = addr_array[1];

                if (addr_array[2] != null) {
                    city_temp = addr_array[2];
                    state_abv_temp = addr_array[3];
                    postal_temp = addr_array[4];
                } else {
                    city_temp = addr_array[5];
                    state_abv_temp = addr_array[6];
                    postal_temp = addr_array[7];
                }
            }

            street_temp = street_temp.replace(/Road/i, "Rd");
            street_temp = street_temp.replace(/Street/i, "St");
            street_temp = street_temp.replace(/Drive/i, "Dr");
            street_temp = street_temp.replace(/Avenue/i, "Ave");
            street_temp = street_temp.replace(/Lane/i, "Ln");
            street_temp = street_temp.replace(/Parkway/i, "Pkwy");
            street_temp = street_temp.replace(/Plaza/i, "Plz");
            street_temp = street_temp.replace(/Route/i, "RTE");
            street_temp = street_temp.replace(/Boulevard/i, "Blvd");
            street_temp = street_temp.replace(/Terrace/i, "TER");
            street_temp = street_temp.replace(/Circle/i, "Cir");

        }

        this.setState({
            a_text: addr_text, street: street_temp, city: city_temp, state_abv: state_abv_temp, postal: postal_temp
        });
    }
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.address_input_container')
    .forEach(domContainer => {
        // Read the comment ID from a data-* attribute.
        const commentID = parseInt(domContainer.dataset.commentid, 10);
        ReactDOM.render(
            e(AddressInput, {commentID: commentID}),
            domContainer
        );
    });