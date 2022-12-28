const Filter = ({ nameFilter, setNameFilter }) => {
    return (
      <div>
        <p>find countries:
        <input
          value={nameFilter}
          onChange={(event) => {
            setNameFilter(event.target.value)
          }}
        />
        </p>
      </div>
    )
  }
export default Filter