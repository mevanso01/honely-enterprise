import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

export const PaginationButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

export const PageButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  font-size: 14px;
  color: #000;
  outline: none;
  border: none;
  border-radius: 27px;
  min-width: 27px;
  min-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 7px;
  margin-right: 3px;

  &:hover {
    background-color: #1507260a;
    color: #000;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active {
    background-color: #1507261a;
  }

  ${({ active }) => active && css`
    background-color: #FF9900;
    color: #F8F8F8;
    &:hover {
      background: ${darken(0.04, '#FF9900')};
      color: #F8F8F8;
    }
    &:active {
      background: ${darken(0.1,  '#FF9900')};
      color: #F8F8F8;
    }
  `}

  ${({ noEffect }) => noEffect && css`
    cursor: initial;
    &:hover {
      background-color: transparent;
    }
    &:active {
      background-color: transparent;
    }
  `}

  svg {
    margin-left: 0;
  }
`
