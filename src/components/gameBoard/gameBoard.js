import React , {useState , useEffect} from 'react';
import GameCard from '../gameCard/gameCard';
import '../gameBoard/gameBoard.scss'
const back = 'https://static.vecteezy.com/system/resources/thumbnails/008/076/820/small_2x/twin-motor-engine-illustration-free-vector.jpg'
export default function GameBoard(){
  //cartas elejidas
    const [carta_uno , set_carta_uno] = useState(null)
    const [carta_dos , set_carta_dos] = useState(null)
    const [cartas, set_cartas] = useState([])
    const [turns, set_turns] = useState(0)
    const [activated, set_activated] = useState(true)
    const [end_game, set_end_game] = useState(false)

  //fotografías
    const photgraphs = [
      {src: 'https://kenworthcolombia.com/wp-content/uploads/destacada-3-scaled-1.jpg' , name :'KENWORTH T800' , isMatched : false} ,
      {src: 'https://img.ccjdigital.com/files/base/randallreilly/all/image/2022/08/57X.62e81a2518740.png?auto=format%2Ccompress&fit=max&q=70&w=1200' , name :' Western Star 57X', isMatched : false} ,
      {src: 'https://www.freightliner.pe/files/new-cascadia-int.jpg' , name :'FREIGHTLINER CASCADIA' , isMatched : false} ,
      {src: 'https://exclusivecarregistry.com/images/thumbnails/thumb_28488.jpg' , name :'what color is your Bugatti?' , isMatched : false} ,
      {src: 'https://www.supercars.net/blog/wp-content/uploads/2021/11/Mercedes-AMG-One-Road.jpg' , name :'Mercedes-AMG-One-Road' , isMatched : false},
      {src: 'https://images.hgmsites.net/hug/2016-hennessey-venom-gt-spyder-naval-air-station-lemoore_100554253_h.jpg' , name: 'Hannessey venom gt'},
      {src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg/1200px-LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg' , name :'Ferrari La Ferrari' , isMatched : false} ,
      {src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/koenigsegg-agera-rs-1-1617871329.jpg?resize=480:*' , name :'koenigsegg Agera RS', isMatched : false} ,
      {src: 'https://www.topgear.com/sites/default/files/images/gallery-migration/2012-03/36C76472-B665-4FA6-AC2C-57915D7F85FB_1.jpg' , name :'Gumpert Apollo Enraged' , isMatched : false} ,
      {src: 'https://static.wikia.nocookie.net/drive-club/images/2/2f/RUF_CTR3_Clubsport_front.jpg/revision/latest/scale-to-width-down/350?cb=20190820102838' , name :'RUF CTR3' , isMatched : false} ,
      {src: 'https://more.brandt.ca/website/media/Peterbilt/blog/blog-feature-715x500/715x500-peterbilt-model-389.jpg?ext=.jpg' , name :'Peterbilt 389' , isMatched : false},
      {src: 'https://orion.soarr.com/photos/16044720/800x/2021-international-lonestar.1.jpg' , name: 'Internationallonestar' , isMatched : false}
    ]
    const shuffle = () => {
      let i = 0
      const all_cards = [ ...photgraphs , ...photgraphs ]
      .sort(() => i+= 1)
      .map((card) => ({ ...card, id: Math.random() }))
      set_cartas(all_cards)
      console.log(all_cards)
    }
    const reset = () => {//reinicar el juego
      shuffle()
      set_turns(0)
      set_activated(true)
      set_carta_uno(null)
      set_carta_dos(null)
      set_end_game(false)
    }
    const game_flow = () => { // es para el flujo del juego , maneja el contador y las elecciones
      set_carta_uno(null)
      set_carta_dos(null)
      set_turns(turns => turns + 1)
      set_activated(true) 
     }
     const ver_status = () => { //revisar su scoreboard para ver cuantas lleva
      let cartas_contador = 0
      cartas.forEach(card_element => {
        if(card_element.isMatched){
          cartas_contador++
        }
      })
      console.log(cartas_contador)
      return cartas_contador
    }
     const handleElections = (card) => { 
      carta_uno ? set_carta_dos(card) : set_carta_uno(card)
     }
     useEffect(() => { //revolver cartas
      shuffle()
      set_end_game(false)
     },[])

     //verificar que ya haya terminado
     useEffect(() => {
      if(ver_status() == cartas.length ) {
        set_end_game(true)
      }
     } , [ver_status()]) 

    useEffect(() => {
      ver_status()
    }, [carta_uno,carta_dos]) 

    useEffect(()=>{ //manejo de las cartas elejidas
      if(carta_uno&&carta_dos) {
        set_activated(false)
        if(carta_uno.src === carta_dos.src) {
          //colocar en el listado que coinciden
          set_cartas(cart => {
            return cart.map(card => {
              if(card.src === carta_dos.src) {
                  return {...card , isMatched : true}
              }else{
                return card
              }
            })
          })
          game_flow()
        } else{
        setTimeout(() => game_flow(),1000)
        }
      }
    }, [carta_uno,carta_dos])
    return (
        <div className="game-board">
          <p className = "counter">Movimientos: {turns}</p>
          <div className='juego_terminado' >{end_game ? 'GAME OVER' : ''}</div>
          <div className='cards-wrapper'>
          {cartas.map((photo) => (
                <GameCard card = {photo}  
                key = {photo.id}
                electionHandler = {handleElections} 
                isActivated = {activated}
                isFlipped={photo === carta_uno || photo === carta_dos || photo.isMatched}
                back = {back}
                ></GameCard>)
                )} 
          </div>
        </div>
    );
}