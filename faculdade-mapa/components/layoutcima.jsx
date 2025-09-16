import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
// import Referencia from "./Referencia"; // descomente quando criar o arquivo

const mapSources = {
  1: require("../assets/images/mapa.jpg"),
};

export default function MapControls() {
  const [selectedMap, setSelectedMap] = useState("1");
  const [scale, setScale] = useState(1);
  const [search, setSearch] = useState("");
  const [showReferencia, setShowReferencia] = useState(false);

  const handleZoomIn = () => setScale(prev => prev + 0.2);
  const handleZoomOut = () => setScale(prev => (prev > 0.4 ? prev - 0.2 : prev));
  const handleSearch = () => console.log("Buscando por:", search);

  const handleBandeira = () => {
    console.log("Escolher local para marcar com o pin");
    // lógica para marcar pin no mapa
  };

  const handleLupa = () => setShowReferencia(true);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Local"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Controles de Zoom e novos botões */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleZoomIn} style={styles.controlBtn}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut} style={styles.controlBtn}>
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>

        {/* Botão Bandeira */}
        <TouchableOpacity onPress={handleBandeira} style={styles.controlBtn}>
          <Image source={require("../assets/images/bandeira.png")} style={styles.icon} />
        </TouchableOpacity>

        {/* Botão Lupa */}
        <TouchableOpacity onPress={handleLupa} style={styles.controlBtn}>
          <Image source={require("../assets/images/lupa.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Menu de mapas */}
      <View style={styles.menu}>
        {["T", "1", "2", "3", "4"].map(item => (
          <TouchableOpacity key={item} onPress={() => setSelectedMap(item)} style={styles.menuBtn}>
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal Referência */}
      {/*
      <Modal visible={showReferencia} transparent animationType="slide">
        <Referencia onClose={() => setShowReferencia(false)} />
      </Modal>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: "absolute",
    top: 10,
    width: "100%", 
    alignItems: "center",
    zIndex: 999,
  },
  logo: { width: 250, height: 70, marginBottom: 5 },
  searchBar: { flexDirection: "row", alignItems: "center", width: "40%", marginBottom: 5 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 8, height: 30, borderRadius: 5, fontSize: 14, top: 100, right: 250 },
  searchButton: { marginLeft: 5, backgroundColor: "#a1089aff", padding: 6, borderRadius: 5 },
  controls: { flexDirection: "row", marginVertical: 4 },
  controlBtn: { marginHorizontal: 5, backgroundColor: "#98199cff", borderRadius: 5, padding: 6, top: -10, right: 180, alignItems: "center", justifyContent: "center" },
  controlText: { color: "#fff", fontSize: 16 },
  icon: { width: 20, height: 20 },
  menu: { flexDirection: "row", marginVertical: 5 },
  menuBtn: { marginHorizontal: 3, padding: 6, backgroundColor: "#b81fccff", borderRadius: 5, top: -50, left: 185 },
  menuText: { color: "#fff", fontSize: 14 },
});

