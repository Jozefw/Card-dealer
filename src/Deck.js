import React,{Component} from 'react';
import Axios from 'axios';
import SingleCard from './SingleCard';
const API_BASE = "https://deckofcardsapi.com/api/deck";



class Deck extends Component{
    constructor(props){
        super(props);
        this.state={deck:null,drawn:[]}
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount(){
        const API_RESULTS = await Axios.get(`${API_BASE}/new/shuffle`)
        this.setState({deck:API_RESULTS.data})
    }

    getCard = async ()=>{
        let deckId = this.state.deck.deck_id;
        try{
            let cardURL = `${API_BASE}/${deckId}/draw/`;
            let cardResults = await Axios.get(cardURL);
            if(!cardResults.data.success){
            throw new Error("No more cards!")
        }
        
        let card = cardResults.data.cards[0];
        console.log(cardResults.data)
        this.setState(st =>({
            drawn:[
                ...st.drawn,{
                    id:card.code,
                    image:card.image,
                    name:`${card.value} of ${card.suit}`
                }
            ]
        }))
    }catch(error){
        alert(error)
    }

    }
    render(){
        const cardList = this.state.drawn.map((card)=>(
            <SingleCard key={card.id} name={card.name} image={card.image}></SingleCard>
        ))
        return(
            <div>
                <h1>Master Shuffle</h1>
                <div>
                <button onClick={this.getCard}>New Card</button>
                </div>
                {cardList}
            </div>
        )
    }
}

export default Deck;