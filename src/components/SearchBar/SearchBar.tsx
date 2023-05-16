import React, { FC } from 'react'
import { IonSearchbar } from '@ionic/react';
import "./SearchBar.css"

type searchBarProps ={
  onChange: any,
  placeHolder: string
}

const SearchBar: FC<searchBarProps> = ({onChange, placeHolder}) => {
  return (
    <IonSearchbar onIonInput={onChange} animated={true} placeholder={placeHolder}></IonSearchbar>
  )
}


export default SearchBar;