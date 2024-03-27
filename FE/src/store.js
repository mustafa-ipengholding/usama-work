import { configureStore } from '@reduxjs/toolkit'

import employeeDataSlice from './action/employeeSlice'

export const store = configureStore({
  reducer: {
    EmployeeData : employeeDataSlice
  },
})
