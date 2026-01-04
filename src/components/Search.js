import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'
import queryString from 'query-string'

import { Searchbar } from './Searchbar'

import { Posts } from './Posts'

export const Search = ({ data, section }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { search } = queryString.parse(window.location.search)
      setQuery(search || '')
    }
  }, [])
  const { localSearchPages } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    localSearchPages.store
  )

  return (
    <>
      <Searchbar
        count={data.length}
        query={query}
        handleSearch={(event) => {
          const updatedValue = event.target.value
            ? `/${section}/?search=${event.target.value}`
            : ''

          navigate(updatedValue)

          setQuery(event.target.value)
        }}
        style={{ marginBottom: '2.5rem' }}
      />
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears query={query} />
          ) : (
            <p style={{ marginTop: '2rem' }}>
              Sorry, nothing matched that search.
            </p>
          )
        ) : (
          <Posts data={data} showYears />
        )}
      </section>
    </>
  )
}
