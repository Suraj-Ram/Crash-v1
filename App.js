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
  Pressable
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
    setShouldTick(true);
    setValue(value - BUY_AMT);
  };

  const handleSell = () => {
    setShouldTick(false);
    setValue(value + data2[data2.length - 1]);
  };

  const displayMoney = (amt) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    })
    return formatter.format(amt)
  }

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
        <Text style={styles.ticker}>{"+ " + Math.round(data2[data2.length - 1])}</Text>

        <Text style={styles.money}>{displayMoney(value)}</Text>

        <Pressable style={styles.buyButton}
          onPress={shouldTick ? () => handleSell() : () => handleBuy()}
        >
          <Text style={styles.buyButtonText}>{shouldTick ? "SELL" : "BUY"}</Text>
        </Pressable>
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
  ticker: {
    fontSize: 18,
    padding: 5,
    marginBottom: 10,
  },
  money: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
    padding: 5,
    marginBottom: 10,


  },
  buyButton: {
    // color: "red",
    // fontSize: 20,
    // fontWeight: "bold",
    // borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',

    //display: shouldTick && "none",
  },
  buyButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default App;
