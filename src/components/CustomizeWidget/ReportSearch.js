import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/HonelySearch.css';

export default function ReportSearch() {
  const [timer, setTimer] = useState(null)
  const [level, setLevel] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showResult, setShowResult] = useState(false)
  function getPropertyData(propertyId) {
    if(propertyId) {
        axios.get('https://api.honely.com/lookup/listing?property_id=' + propertyId)
        .then((response) => {
          window.sessionStorage.setItem('subjectPropertyDetails', JSON.stringify(response.data))
        })
    }
}
  function getForecast(value) {
    axios.get('https://api.honely.com/searches/forecast?address=' + value + '&user_id=512')
    .then((response) => {
      window.sessionStorage.setItem('subjectForecastDetails', JSON.stringify(response.data))
    })
  }
  function doSearch() {
    clearTimeout(timer)
    setTimer(
        setTimeout(function () {
            let search = document.getElementById('search-input-simple')

            if(search && search !== null && search !== '') {
                search = search.value
                    if (search !== '') {
                    search = search.trim()
                }
            }
            if (search.length > 5) {
                setLoading(true)
                const url = 'https://api.honely.com/lookup/forecast_suggestions?address=' + search
                fetch(url, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(function (response) {
                      if (!response.ok) {
                        throw Error(response.status)
                      }
                      return response.json()
                  }).then(function (data) {
                      setLoading(false)
                      if (data) {
                          setLevel(data.level)
                          const results = data.rows
                          setResults(results)
                          setMessage('')
                          setShowResult(true)
                      }
                  }).catch((err) => {
                      setLoading(false)
                      setResults([])
                      console.log('[ERROR] Honely search API failed =>', err)
                      setMessage('No suggestion found')
                  }) 
            } else if (search === '') {
                setLoading(false)
                setResults([])
                setMessage('')
              } else {
                setLoading(false)
                setResults([])
                setMessage('Search must contain at least 6 characters')
              }
        }, 500)
    )
}
  function splitAddress (item) {
      var addrConstituents = item.split(' ')
      var zip = ''
      var state = ''
      var pre = ''
      var addr = {}
      if (addrConstituents.length === 1) {
        zip = addrConstituents[0]
      } else if (isNaN(addrConstituents[addrConstituents.length - 1])) {
        state = addrConstituents[addrConstituents.length - 1]
        pre = addrConstituents.slice(0, addrConstituents.length - 1).join(' ')
        pre = pre.slice(0, pre.length-1)
      }
      else {
        zip = addrConstituents[addrConstituents.length - 1]
        state = addrConstituents[addrConstituents.length - 2]
        pre = addrConstituents.slice(0, addrConstituents.length - 2).join(' ')
      }
      addr.pre = pre
      addr.state = state
      addr.zip = zip
      return addr
  }
  function searchResultClickAction(value) {
    getForecast(value)
  }
  function Message () {
      if(message && message !== null && message !== '') {
          return(
              <div className="search-message">{ message }</div>
          )
      }
      return
  }
  function Loading () {
      if (loading) {
          return (
              <span className='mdi mdi-loading mdi-spin spin search-loader'></span>
          )
      } else {
          <span className='search-loader-placeholder'></span>
      }
  }
  function SearchResultContainer() {
    function Pikachu() {
        if (level === 'street') {
            var ans = []
            for (let i=0;i<results.length;i++) {
                function Street() {
                    var x=(splitAddress(results[i])).pre
                    return(
                        <span className="search-result-street"> {x} </span>
                    )
                }
                function State() {
                    var x =(splitAddress(results[i])).state
                    return(
                        <span className="search-result-state"> {x} </span>
                    )
                }
                function Zip() {
                    var x = (splitAddress(results[i])).zip
                    return(
                        <span className="search-result-zip"> {x} </span>
                    )
                }
                ans.push(
                    <li onClick={() => {searchResultClickAction(results[i])}}>
                    <div className="search-result-col">
                        <span className="mdi mdi-home"></span>
                        <Street />
                    </div>
                    <div className="search-result-col">
                        <State />
                        <Zip />
                    </div>
                    </li>
                )
            }
            return (
                <ul>
                    {ans}
                </ul>
            )
        }
        return
    }
    if(results && results.length > 0 && showResult) {
        return (
            <div className="search-result-container" style={{margin: 'auto'}}>
                <Pikachu />
            </div>
        )
    }
    return
}
  return (
    <div className="search-container" style={{width: '59%'}}>
    <div
      className="search-input-wrapper"
      style={{ background: "white", padding: "2px", width: '100%', margin: 'auto' }}
    >
      <input
        type="text"
        autoFocus
        id="search-input-simple"
        className="search-input"
        placeholder="Enter the address for the property report"
        autoComplete="off"
        onKeyUp={() => {doSearch()}}
      ></input>
      <Loading />
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="8.25" stroke="black" stroke-width="1.5" />
        <line
          x1="18.9481"
          y1="22.5555"
          x2="13.4071"
          y2="15.4634"
          stroke="black"
          stroke-width="1.5"
        />
      </svg>
    </div>
    <Message />
    <SearchResultContainer />
    </div>
  );
}
