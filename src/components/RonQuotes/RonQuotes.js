import React, {Component} from "react";
import axios from "axios";
import RonSwansonImg from "../../images/RonSwanson.jpg";


export default class RonSwanson extends Component {
    constructor() {
        super();

        this.state = {
            ronQuote: "Give me all the bacon and eggs you have."
        };
    }

    ronQuote() {
        axios.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
            .then((response) => {
                this.setState({
                    ronQuote: response.data
                })
            })
    }

    render() {
        return (
            <div className="ron-container">
                <div className="ron-page">
                    <img className="ron-image" src={RonSwansonImg} alt="Ron Swanson"/>

                    <button className="ron-button" onClick={()=> this.ronQuote()}>Click Here For More Ron</button>
                    <p className="ron-quote-result"> {this.state.ronQuote}  </p>
                </div>
            </div>
            
        );
    }
}