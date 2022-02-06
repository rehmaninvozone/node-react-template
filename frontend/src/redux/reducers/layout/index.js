// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

import { createSlice } from '@reduxjs/toolkit'

// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Initial State
const initialState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth
}

const layoutReducer = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleContentWidth(state, action) {
      state.contentWidth = action.payload
    },
    handleMenuCollapsed(state, action) {
      state.menuCollapsed = action.payload
    },
    handleMenuHidden(state, action) {
      state.menuHidden = action.payload
    },
    handleRTL(state, action) {
      state.isRTL = action.payload
    }
  }
})

export const {handleContentWidth, handleMenuCollapsed, handleMenuHidden, handleRTL} = layoutReducer.actions
export default layoutReducer.reducer
