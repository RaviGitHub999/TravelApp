import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import { fonts } from './app/config/theme';

interface PostData {
  title: string;
  body: string;
  userId: number;
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (url: string, method: string = 'GET', requestData?: PostData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: requestData ? JSON.stringify(requestData) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);

    } catch (error:any) {
      setError(error.message);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Example usage on component mount (GET request)
    sendRequest('https://jsonplaceholder.typicode.com/posts/1');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontFamily:fonts.subTitle,fontSize:30}}>Ravi</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {data && (
        <View>
          <Text>Data: {JSON.stringify(data)}</Text>
        </View>
      )}

      <Button
        title="Send GET Request"
        onPress={() => {
          // Example usage of GET request
          sendRequest('https://jsonplaceholder.typicode.com/posts/1', 'GET');
        }}
      />
      <Button
        title="Send POST Request"
        onPress={() => {
          // Example usage of POST request
          const postData: PostData = {
            title: 'foo',
            body: 'bar',
            userId: 1,
          };
          sendRequest('https://jsonplaceholder.typicode.com/posts', 'POST', postData);
        }}
      />
      <Button
        title="Send DELETE Request"
        onPress={() => {
          // Example usage of DELETE request
          sendRequest('https://jsonplaceholder.typicode.com/posts/1', 'DELETE');
        }}
      />
      <Button
        title="Send UPDATE Request"
        onPress={() => {
          // Example usage of UPDATE request
          const updateData: PostData = {
            title: 'foo',
            body: 'bar',
            userId: 1,
          };
          sendRequest('https://jsonplaceholder.typicode.com/posts/1', 'PUT', updateData);
        }}
      />
    </View>
  );
};

export default MyComponent;
