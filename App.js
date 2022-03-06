import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Dimensions,
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

  const incrementData = () => {
    setData2((prev) => [...prev, prev.pop() * 1.05]);
  };

  useEffect(() => {
    const tick = setInterval(() => {
      incrementData();
    }, 250);

    return () => clearInterval(tick);
  }, []);

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

  return (
    <SafeAreaView styles={graphStyles.container}>
      <Text>Crash v1</Text>
      <LineChart
        data={{
          // labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: data2,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        //bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
