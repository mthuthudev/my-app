import { useState } from "react";

function Person({num, name}){
    return <li>{name} : {num}</li>
}

export default function Phonebook() {
    const [persons, setPersons] = useState(
        [{name: 'Mthu Sibanda', num: '09239'},
        {name: 'reg Sibanda', num: '4522'},
        {name: 'Mthu qww', num: '245'}
    ]
    )
    const [newPerson, setNewPerson] = useState({name: 'New name..', num: '0'})
    const [searchInput, setSearchInput] = useState('jj')
    const [searchResults, setSearchResults] = useState([])

    function addName(event){
        event.preventDefault()
        const nums = persons.map((n) => n.num)
        if(nums.findIndex((n) => newPerson.num === n) !== -1) {
            alert(`${newPerson.num} is alreaady in the phonebook`)
            return
        }
        setPersons(persons.concat(newPerson))  
        setNewPerson({name:'',num:''}) 
    }

    function handleNameInputChange(event){
        setNewPerson({...newPerson,name: event.target.value})
    }

    function handleNumInputChange(event){
        setNewPerson({...newPerson, num: event.target.value})
    }

    function handleSearchChange(event){
        const filtered = persons.filter((p) => {
            if(p.name.search(event.target.value) > -1 || p.num.search(event.target.value) > -1)
                return true
        })
        setSearchResults(filtered)
        setSearchInput(event.target.value)
    }

    return(
        <div>
            <h2>Phonebook</h2>
            <div>
                <label>search:</label>
                <input value={searchInput} onChange={handleSearchChange}/>
                <h4>search results</h4>
                <ul>
                    {searchResults.map((s) => <Person key={s.num} name={s.name} num={s.num}/>)}
                </ul>
            </div>

            <form onSubmit={addName}>
                <label>number:</label>
                <input value={newPerson.num} onChange = {handleNumInputChange}/>
                <br/>
                <label>name:</label>
                <input value={newPerson.name} onChange={handleNameInputChange}/>
                <br/>
                <button type="submit">add</button>
            </form>
            <h3>Names</h3>
            <ul>
                {persons.map((p) => <Person key={p.num} name={p.name} num={p.num}/>)}
            </ul>
        </div>
    )
} 
