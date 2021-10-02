import React, { FC, useState } from 'react'
import AlbumController from '../controllers/AlbumController'
import AlbumContainer from '../components/AlbumContainer'
import PhotoContainer from '../components/PhotoContainer'

const PhotoAlbum: FC = () => {
  const [selectedAlbumName, getSelectedAlbumName] = useState('')
  const selectedAlbumNameHandler = (name: string) => {
    getSelectedAlbumName(name)
    console.log(selectedAlbumName)
  }

  return (
    <>
      <AlbumController
        albumContainer={
          <AlbumContainer selectedAlbumNameHandler={selectedAlbumNameHandler} />
        }
        albumName={selectedAlbumName}
      />
      {selectedAlbumName === '' ? null : (
        <PhotoContainer albumName={selectedAlbumName} />
      )}
    </>
  )
}

export default PhotoAlbum
