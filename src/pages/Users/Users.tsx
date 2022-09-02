import { AppUseDispatch, useAppSelector } from '../../hooks/redux'
import React, { useEffect, useMemo } from 'react'
import UserCard from '../../components/UserCard'
import { getTitle, getUsers, sortedItem } from '../../redux/slices/userSlice'
import Input from '../../components/Input'
import DragDown from '../../components/DragDown'
import Spinner from '../../components/Spinner'

export default function Users() {
  const { users, sort, title, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  )
  const dispatch = AppUseDispatch()
  // const [title, setTitle] = useState<string>('')
  // const [sort, setSort] = useState<string>('')

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const search: React.EventHandler<any> = (e) => {
    dispatch(getTitle(e.target.value))
  }
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortedItem(e.target.value))
  }
  const dataList = useMemo(() => {
    let sortedUser = users
    if (sort === 'Asc') {
      return (sortedUser = [...users].sort((a, b) =>
        a.name.localeCompare(b.name),
      ))
    } else if (sort === 'Desc') {
      return (sortedUser = [...users]
        .sort((a, b) => a.name.localeCompare(b.name))
        .reverse())
    } else {
      return sortedUser.filter((item) =>
        item.name.toLowerCase().includes(title.toLowerCase()),
      )
    }
  }, [users, sort, title])
  return (
    <div className="container">
      <h3 className=" font-bold mt-2 text-3xl text-center">Users</h3>
      <div className="row">
        <div className="float-left  right row s12 mt">
          <DragDown action={handleSort} />
        </div>
        <Input search={search} title={title} />
      </div>
      {isLoading && <Spinner />}
      {error && <div>error.message</div>}
      {dataList.map((data) => (
        <UserCard key={data.id} data={data} />
      ))}
    </div>
  )
}
