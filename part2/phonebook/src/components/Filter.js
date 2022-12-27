const Filter = ({ nameFilter, setNameFilter }) => {
    return (
      <div>
        <p>filter shown with
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