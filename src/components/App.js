import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleTypeChange = event => {
    this.setState({
      filters: {...this.state.filters, [event.target.name]: event.target.value}
    })
  }

  fetchPets = () => {
    if (this.state.filters.type === 'all') {
      fetch(`/api/pets`)
      .then(res => res.json())
      .then(pets => {
        this.setState({
          pets: pets
        })
      })
    }
    if (this.state.filters.type === 'cat') {
      fetch(`/api/pets?type=cat`)
      .then(res => res.json())
      .then(cats => {
        this.setState({
          pets: cats
        })
      })
    }
    if (this.state.filters.type === 'dog') {
      fetch("/api/pets?type=dog")
      .then(res => res.json())
      .then(dogs => {
        this.setState({
          pets: dogs
        })
      })
    }
    if (this.state.filters.type === 'micropig') {
      fetch("/api/pets?type=micropig")
      .then(res => res.json())
      .then(micropigs => {
        this.setState({
          pets: micropigs
        })
      })
    }
  }

  onAdoptPet = clickedPet => {
    clickedPet.isAdopted = 'true'
    this.setState({
      pets: this.state.pets.map(pet => pet.id === clickedPet.id ? clickedPet : pet)
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleTypeChange}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
