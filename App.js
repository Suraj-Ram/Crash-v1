import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const App = () => {
  const [data, setData] = useState([
    1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096,
  ]);

  const [data2, setData2] = useState([1]);
  const [shouldTick, setShouldTick] = useState(false);
  const [value, setValue] = useState(1000);

  const incrementData = () => {
    setData2((prev) => {
      if (shouldTick) {
        if (prev.length > 10) {
          const newPrev = prev.slice(1);
          return [...newPrev, newPrev.pop() * 1.05];
        } else {
          return [...prev, prev.pop() * 1.05];
        }
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    const tick = setInterval(() => {
      incrementData();
      //incrementData();
    }, 250);

    return () => clearInterval(tick);
  }, [shouldTick]);

  const graphStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 16,
    },
    title: {
      textAlign: "center",
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: "#737373",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

  const BUY_AMT = 100;

  const handleBuy = () => {
    if (value <= BUY_AMT) {
      Alert.alert("You don't have enough money!");
      return;
    }
    setShouldTick(true);
    setValue(value - BUY_AMT);
  };

  const handleSell = () => {
    setShouldTick(false);
    setValue(value + data2[data2.length - 1]);
    setData2([1]);
  };

  return (
    <SafeAreaView styles={graphStyles.container}>
      <Text>Crash v1</Text>
      <LineChart
        data={{
          // labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: data2,
              color: () => "#fff",
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={400}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: shouldTick ? "#14b8a6" : "#16a34a",
          backgroundGradientTo: shouldTick ? "#14b8a6" : "#16a34a",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          strokeWidth: "7",
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        withDots={false}
        withShadow={false}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={styles.buttonContainer}>
        <Text>{Math.round(data2[data2.length - 1])}</Text>
        <Text>{`$ ${value}`}</Text>

        <TouchableOpacity
          onPress={shouldTick ? () => handleSell() : () => handleBuy()}
        >
          <Text style={styles.buyButton}>{shouldTick ? "SELL" : "BUY"}</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity onPress={() => handleBuy()}>
          <Text style={styles.buyButton}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSell()}>
          <Text style={styles.buyButton}>SELL</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buyButton: {
    color: "red",
    fontSize: 18,
    //display: shouldTick && "none",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default App;
