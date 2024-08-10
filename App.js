import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the FontAwesome icon library

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        updateScore(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      setWinner('Tie');
    }
  };

  const updateScore = (player) => {
    setScore((prevScore) => ({
      ...prevScore,
      [player]: prevScore[player] + 1,
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScoreboard = () => {
    setScore({ X: 0, O: 0 });
    resetGame();
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.square}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return winner === 'Tie' ? 'It\'s a Tie!' : `Winner: ${winner}`;
    } else {
      return `Next Player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreboard}>
        <Text style={styles.score}>X: {score.X}</Text>
        <Text style={styles.score}>O: {score.O}</Text>
      </View>
      <Text style={styles.status}>{renderStatus()}</Text>
      <View style={styles.turnIndicator}>
        <Text style={isXNext ? styles.turnX : styles.turnO}>
          {isXNext ? 'X' : 'O'}'s Turn
        </Text>
      </View>
      <View style={styles.board}>
        {board.map((_, index) => renderSquare(index))}
      </View>
      {winner && (
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Play Again</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.resetScoreboardButton} onPress={resetScoreboard}>
        <Text style={styles.resetButtonText}>Reset Scoreboard</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Malitha</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Malitha-Gunathilaka')}>
          <FontAwesome name="github" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turnIndicator: {
    marginBottom: 10,
  },
  turnX: {
    fontSize: 18,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  turnO: {
    fontSize: 18,
    color: '#0000ff',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resetScoreboardButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
});
