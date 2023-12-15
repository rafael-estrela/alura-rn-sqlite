import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { useEffect, useState } from "react"

import { createTable, retrieveNotes, retrieveNotesWithFilter } from "./src/servicos/notas"
import { Picker } from "@react-native-picker/picker"

export default function App() {
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notes, setNotes] = useState([])
  const [filtro, setFiltro] = useState("Todos")

  const getAllNotes = async () => {
    const notes = await retrieveNotes()
    setNotes(notes)
  }

  const filterNotes = async () => {
    const notes = await retrieveNotesWithFilter(filtro)
    setNotes(notes)
  }

  useEffect(() => {
    createTable()
    getAllNotes()
  }, [])

  useEffect(() => {
    filtro == 'Todos' ? getAllNotes() : filterNotes()
  }, [filtro])

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.modalPicker}>
        <Picker selectedValue={filtro} onValueChange={item => setFiltro(item)}>
          <Picker.Item style={estilos.pickerItem} label="Todos" value="Todos"/>
          <Picker.Item style={estilos.pickerItem} label="Pessoal" value="Pessoal"/>
          <Picker.Item style={estilos.pickerItem} label="Trabalho" value="Trabalho"/>
          <Picker.Item style={estilos.pickerItem} label="Outros" value="Outros"/>
        </Picker>
      </View>
      <FlatList data={notes} renderItem={(note) => <Nota { ...note } setNotaSelecionada={setNotaSelecionada} />} keyExtractor={(note) => note.id} />
      <NotaEditor showNotes={getAllNotes} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
  pickerItem: {
    fontSize: 16,
  },
})

