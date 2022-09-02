interface UserDetails {
  data: { id: number; name: string }
}

function UserCard(props: UserDetails) {
  const { name, id } = props.data
  return (
    <div>
      <div>
        {id} - {name}
      </div>
    </div>
  )
}

export default UserCard
