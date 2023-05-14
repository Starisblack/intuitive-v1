import React, { FC } from 'react'
import { IonSearchbar } from '@ionic/react';
import "./SearchBar.css"

type searchBarProps ={
  onChange: any
}

const SearchBar: FC<searchBarProps> = ({onChange}) => {
  return (
    <IonSearchbar onIonInput={onChange} animated={true} placeholder="search..."></IonSearchbar>
  )
}


export default SearchBar;