import React, { useEffect, useMemo } from 'react'
import TodoCard from '../../components/TodoCard'
import { AppUseDispatch, useAppSelector } from '../../hooks/redux'
import { getTitle, getTodos, sortedItem } from '../../redux/slices/todoSlice'
import DragDown from '../../components/DragDown'
import Input from '../../components/Input'
import Spinner from '../../components/Spinner'

export default function Todos() {
  const { todos, title, sort, isLoading, error } = useAppSelector(
    (state) => state.todoReducer,
  )
  const dispatch = AppUseDispatch()
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  const search = (e: any) => {
    dispatch(getTitle(e.target.value))
  }
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortedItem(e.target.value))
  }
  const dataList = useMemo(() => {
    let sortedUser = todos
    if (sort === 'Asc') {
      return (sortedUser = [...todos].sort((a, b) =>
        a.title?.localeCompare(b?.title),
      ))
    } else if (sort === 'Desc') {
      return (sortedUser = [...todos]
        .sort((a, b) => a?.title.localeCompare(b?.title))
        .reverse())
    } else {
      return sortedUser.filter((item) =>
        item?.title?.toLowerCase().includes(title.toLowerCase()),
      )
    }
  }, [todos, sort, title])
  return (
    <div className="container">
      <h2 className="font-bold mt-2 text-3xl text-center">Todos</h2>
      <div className="row">
        <div className=" float-left  right row s12 mt">
          <DragDown action={handleSort} />
        </div>
        <Input search={search} title={title} />
      </div>
      {isLoading && <Spinner />}
      {error && <div>error.message</div>}
      {dataList.map((data) => (
        <TodoCard key={data.id} data={data} />
      ))}
    </div>
  )
}
