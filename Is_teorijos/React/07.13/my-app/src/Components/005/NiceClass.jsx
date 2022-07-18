import { Component } from 'react'

class NiceClass extends Component {

constructor() {
    super();
    this.state = {dydis: 30, fonas: 'skyblue', pliusas: 1, squares: ['']}
} 

greenButtonClicked = () => {

    this.setState({dydis: 60})
}

redButtonClicked = () => {
(this.state.fonas === 'skyblue') ? this.setState({fonas: 'violet'}) : this.setState({fonas: 'skyblue'})
}

grayButtonClicked = () => {
this.setState({pliusas: this.state.pliusas+1} )
}

blueButtonClicked = () => {
    this.setState({squares: [...this.state.squares,'']} )
    // this.setState( s => ({squares: [...s.squares, '']}));
    console.log(this.state.squares)

    }

render() {
    return(
        <>
<h3 style={{color: this.props.spalva,
backgroundColor: this.state.fonas,
fontSize: this.state.dydis + 'px'
}}>As princese</h3> 
<h2 >{this.state.pliusas}</h2>
<div className='container'>
{ this.state.squares.map((_, i) => <div className='square' key={i}></div>) }</div>
<button className='green' onClick={this.greenButtonClicked}>Teksto dydis</button>
<button className='red' onClick={this.redButtonClicked}>Princeses spalva</button>
<button className='gray' onClick={this.grayButtonClicked}>Plius vienas</button>
<button className='blue' onClick={this.blueButtonClicked}>Squares!</button>
</>
)

 }


}

export default NiceClass