import { bindActionCreators } from '@reduxjs/toolkit'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { dateFilterActions } from '../store/reducers/Filters/DateFilterSlice'

const rootActions = {
    ...dateFilterActions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
