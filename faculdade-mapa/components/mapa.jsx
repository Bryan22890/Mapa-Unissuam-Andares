import { useState } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Dialog,
  Provider as PaperProvider,
  Paragraph,
  Portal,
} from "react-native-paper";
import Svg, { Rect } from "react-native-svg";

// Import do LayoutCima
import LayoutCima from "../components/layoutcima";


// Salas e escadas
const SALAS_C = [
  { x: 500, y: 230, text: "Sala 101-C" },
  { x: 410, y: 230, text: "Sala 102-C" },
  { x: 330, y: 230, text: "Sala 103-C" },
  { x: 250, y: 230, text: "Sala 104-C" },
  { x: 170, y: 230, text: "Sala 105-C" },
];

const SALAS_D = [
  { x: 940, y: 270, text: "Sala 101-D", width: 60, height: 70 },
  { x: 940, y: 390, text: "Sala 102-D", width: 60, height: 70 },
  { x: 940, y: 470, text: "Sala 103-D", width: 60, height: 70 },
  { x: 940, y: 550, text: "Sala 104-D", width: 60, height: 70 },
  { x: 890, y: 640, text: "Sala 105-D", width: 100, height: 60 },
  { x: 740, y: 470, text: "Sala 106-D", width: 90, height: 50 },
  { x: 740, y: 700, text: "Sala 107-D", width: 90, height: 40 },
  { x: 585, y: 570, text: "Sala 108-D", width: 100, height: 50 },
  { x: 460, y: 610, text: "Sala 109-D", width: 100, height: 50 },
];

const SALAS_E = [
  { x: 1070, y: 320, text: "Sala 101-E", width: 80, height: 40 },
  { x: 1170, y: 325, text: "Sala 102-E", width: 150, height: 40 },
  { x: 1170, y: 410, text: "Sala 103-E" },
  { x: 1280, y: 395, text: "Sala 104-E", width: 50, height: 80 },
  { x: 1200, y: 510, text: "Sala 105-E", width: 30, rotate: 90, scale: 1.2 },
  { x: 1290, y: 530, text: "Sala 106-E", width: 40, height: 60 },
  { x: 1200, y: 560, text: "Sala 107-E", width: 30, rotate: 90, scale: 1.2 },
  { x: 1280, y: 600, text: "Sala 108-E", width: 40 },
  { x: 1200, y: 650, text: "Sala 109-E", width: 70, height: 40 },
  { x: 1120, y: 650, text: "Sala 110-E", width: 70, height: 40 },
];

const ESCADAS = [
  { x: 600, y: 300, text: "Escada 1", width: 80, height: 90 },
  { x: 1190, y: 490, text: "Escada 2", width: 60, height: 30 },
  { x: 800, y: 600, text: "Escada 3", width: 80, height: 80 },
  { x: 740, y: 80, text: "rampa", width: 200, height: 80 },
  { x: 1010, y: 405, text: "terreo", width: 130, height: 200 },
];

const PONTOS_INTERESSE = [
  { x: 600, y: 260, text: "Sala 101-C" },
  { x: 500, y: 260, text: "Sala 102-C" },
  { x: 400, y: 260, text: "Sala 103-C" },
  { x: 350, y: 260, text: "Sala 104-C" },
  { x: 300, y: 260, text: "Sala 105-C" },
  { x: 980, y: 350, text: "Sala 101-D" },
  { x: 980, y: 450, text: "Sala 102-D" },
  { x: 980, y: 530, text: "Sala 103-D" },
  { x: 980, y: 600, text: "Sala 104-D" },
  { x: 980, y: 670, text: "Sala 105-D" },
  { x: 800, y: 500, text: "Sala 106-D" },
  { x: 800, y: 720, text: "Sala 107-D" },
  { x: 700, y: 600, text: "Sala 108-D" },
  { x: 580, y: 640, text: "Sala 109-D" },
  { x: 1111, y: 350, text: "Sala 101-E" },
  { x: 1200, y: 350, text: "Sala 102-E" },
  { x: 1190, y: 450, text: "Sala 103-E" },
  { x: 1270, y: 450, text: "Sala 104-E" },
  { x: 1220, y: 560, text: "Sala 105-E" },
  { x: 1270, y: 560, text: "Sala 106-E" },
  { x: 1220, y: 620, text: "Sala 107-E" },
  { x: 1270, y: 650, text: "Sala 108-E" },
  { x: 1220, y: 680, text: "Sala 109-E" },
  { x: 1140, y: 680, text: "Sala 110-E" },
  { x: 800, y: 350, text: "Auditório Amarina Motta\nCapacidade: 300 pessoas" },
  { x: 920, y: 150, text: "Biblioteca" },
  { x: 670, y: 370, text: "Escada 1" },
  { x: 1200, y: 520, text: "Escada 2" },
  { x: 840, y: 670, text: "Escada 3" },
  { x: 920, y: 150, text: "rampa" },
  { x: 1050, y: 570, text: "terreo" },
  { x: 1270, y: 520, text: "Banheiro Feminino" },
  { x: 1270, y: 500, text: "Banheiro Masculino" },
];


// Componente Sala
function SalaRect({ salas, fillColor, strokeColor, defaultWidth = 70, defaultHeight = 70, onPress }) {
  return salas.map((sala, index) => {
    const scale = sala.scale || 1;
    const rotate = sala.rotate || 0;
    const w = (sala.width || defaultWidth) * scale;
    const h = (sala.height || defaultHeight) * scale;
    const cx = sala.x + w / 2;
    const cy = sala.y + h / 2;
    return (
      <Rect
        key={index}
        x={sala.x}
        y={sala.y}
        width={w}
        height={h}
        fill={fillColor}
        stroke={strokeColor}
        onPress={() => onPress(sala.text)}
        transform={`rotate(${rotate} ${cx} ${cy})`}
      />
    );
  });
}

// Componente Pin proporcional
function Pin({ x, y, text, onPress, imageWidth, imageHeight }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        left: (x / 1365) * imageWidth - 20,
        top: (y / 768) * imageHeight - 40,
        width: 40,
        height: 40,
      }}
      onPress={() => onPress(text)}
    >
      <Image
        source={require("../assets/images/pincoruja.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

// Componente principal
export default function Mapa() {
  const [visible, setVisible] = useState(false);
  const [infoDialogText, setInfoDialogText] = useState("");
  const [pins, setPins] = useState({});
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const showDialog = (text) => {
    setInfoDialogText(text);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const togglePin = (text) => {
    setPins((prevPins) => ({
      ...prevPins,
      [text]: !prevPins[text],
    }));
    hideDialog();
  };

  return (
    <PaperProvider>
      <LayoutCima />
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/mapa.jpg")}
          style={styles.image}
          resizeMode="contain"
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setImageSize({ width, height });
          }}
        >
          <Svg height="100%" width="100%" viewBox="0 0 1365 768">
            <SalaRect salas={SALAS_C} fillColor="rgba(173,216,230,0.3)" strokeColor="blue" onPress={showDialog} />
            <SalaRect salas={SALAS_D} fillColor="rgba(144,238,144,0.3)" strokeColor="green" defaultWidth={80} onPress={showDialog} />
            <SalaRect salas={SALAS_E} fillColor="rgba(255,165,0,0.3)" strokeColor="orange" onPress={showDialog} />
            <SalaRect salas={ESCADAS} fillColor="rgba(169,169,169,0.3)" strokeColor="black" onPress={showDialog} />

            <Rect x={690} y={290} width={200} height={130} fill="rgba(255,215,0,0.3)" stroke="gold" onPress={() => showDialog("Auditório Amarina Motta\nCapacidade: 300 pessoas")} />
            <Rect x={760} y={20} width={150} height={50} fill="rgba(138,43,226,0.3)" stroke="purple" onPress={() => showDialog("Biblioteca")} />
            <Rect x={1290} y={505} width={40} height={20} fill="rgba(255,105,180,0.3)" stroke="deeppink" onPress={() => showDialog("Banheiro Feminino")} />
            <Rect x={1290} y={485} width={40} height={20} fill="rgba(135,206,250,0.3)" stroke="blue" onPress={() => showDialog("Banheiro Masculino")} />
          </Svg>

          {PONTOS_INTERESSE.map((ponto, index) =>
            pins[ponto.text] ? (
              <Pin key={index} x={ponto.x} y={ponto.y} text={ponto.text} onPress={showDialog} imageWidth={imageSize.width} imageHeight={imageSize.height} />
            ) : null
          )}
        </ImageBackground>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Informação</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{infoDialogText}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Fechar</Button>
              <Button onPress={() => togglePin(infoDialogText)}>
                {pins[infoDialogText] ? "Remover Bandeira" : "Colocar Bandeira"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.1,
    bottom: -150,
  },
  image: {
    flex: 0.6,
    width: "100%",
    height: "100%",
  },
  pin: {
    width: 40,
    height: 40,
  },
});



