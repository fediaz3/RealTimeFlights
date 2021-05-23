
import React, {useState, useEffect} from 'react'
import { Tab, Card } from 'semantic-ui-react'


const panes = []

const FlightsInfo = (props) => {   
    const {flightsInfo} = props
    const [info, setInfo] = useState([])
    useEffect(()=> {
      // console.log("flightsInfo:", flightsInfo)
      let newInfo = flightsInfo.map(x => {
        const { airline, code, destination, origin, passengers, plane, seats} = x
        panes.push(
          {
            menuItem: `${code}`,
            render: () => 
            <Tab.Pane>
              <Card style={{margin: "center", textAlign: "center"}}>
              <Card.Content>
                <Card.Header>{`Flight ${code}`}</Card.Header>
                <Card.Description>
                  <strong>Airline:</strong> {`${airline}`}
                  <p></p>
                  <strong>Origin:</strong> {`${origin}`}
                  <p></p>
                  <strong>Destination:</strong> {`${destination}`}
                  <p></p>
                  <strong>Plane:</strong> {`${plane}`}
                  <p></p>
                  <strong>Seats:</strong> {`${seats}`}
                  <p></p>
                  <strong>Passengers:</strong> {passengers.map(x => {
                    let {name, age} = x
                    return (
                      <>
                        {` ${name} (${age}) |`}
                      </>
                    )
                  })}
                </Card.Description>
              </Card.Content>
              </Card>
            </Tab.Pane>,
          },
        )
        
      })

      setInfo(newInfo)
    }, [flightsInfo]) //efecto secundario al cambio de la "prop" flightsInfo

    return (
      <div id="FlightsInfo" >
        <p></p>
        <p>Flight Information</p>
        <Tab menu={{ pointing: true, vertical:true  }} panes={panes} />
      </div>
    );


}

export {FlightsInfo}