import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/Button';
import { useState } from 'react';

const Operators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
};

const App = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const calculate = () => {
    let calculateNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculateNumber += value;
        } else if (operator === Operators.MINUS) {
          calculateNumber -= value;
        } else {
          calculateNumber = value;
        }
      }
    });
    setResult(calculateNumber);
    setFormula([]);
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
      }
    }
  };

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 5) / 4;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {/* 숫자 버튼 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width, marginTop: 1 }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{ width, height: width, marginTop: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>

        <View>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonStyle={{ width, height: width, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: width, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width: width, height: width * 2 + 1, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretcn',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
