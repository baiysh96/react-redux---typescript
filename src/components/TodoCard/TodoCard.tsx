interface UserDetails {
  data: { id: number; title: string }
}

function TodoCard(props: UserDetails) {
  const { title, id } = props.data
  return (
    <div>
      <div>
        {id} - {title}
      </div>
    </div>
  )
}

export default TodoCard
