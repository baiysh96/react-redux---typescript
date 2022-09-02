import React, { FC } from 'react'
import { AppUseDispatch } from '../../hooks/redux'
import { clearInput } from '../../redux/slices/userSlice'
import { clearField } from '../../redux/slices/todoSlice'

interface IInputProps {
  title: string
  search: any
}
const Input: FC<IInputProps> = ({ title, search }): JSX.Element => {
  const dispatch = AppUseDispatch()
  return (
    <div className=" left row s5 mt">
      <input
        className="relative"
        value={title}
        onChange={search}
        placeholder="Search me..."
        type="text"
      />
      {title.length ? (
        <i
          onClick={() => dispatch(clearInput()) && dispatch(clearField())}
          className=" material-icons mt cursor-p search-icon"
        >
          clear
        </i>
      ) : null}
    </div>
  )
}

export default Input
