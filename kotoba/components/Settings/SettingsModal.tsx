import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSettings } from '@/context/SettingsContext';
import DateTimePicker from '@react-native-community/datetimepicker';


interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
  const { 
    isSoundEnabled, 
    setSoundEnabled, 
    isNotificationsEnabled, 
    setNotificationsEnabled,
    dailyFrequency,
    setDailyFrequency,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useSettings();

  const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

  const onTimeChange = (event: any, selectedDate?: Date) => {

    if (Platform.OS === 'android') setShowPicker(null);
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      
      if (showPicker === 'start') setStartTime(timeString)
      else setEndTime(timeString);
    }
  };

  const getPickerDate = () => {
    const timeStr = showPicker === 'start' ? startTime : endTime;
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.dismissArea} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Configuración</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="volume-high-outline" size={20} color="#FF6B6B" />
                <Text style={styles.sectionTitle}>Sonido</Text>
              </View>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Activar sonidos</Text>
                <Switch 
                  value={isSoundEnabled} 
                  onValueChange={setSoundEnabled} 
                  trackColor={{ true: '#FF6B6B', false: '#ccc' }} 
                />
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="notifications-outline" size={20} color="#FF6B6B" />
                <Text style={styles.sectionTitle}>Notificaciones</Text>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Habilitar notificaciones</Text>
                <Switch 
                  value={isNotificationsEnabled} 
                  onValueChange={setNotificationsEnabled} 
                  trackColor={{ true: '#FF6B6B', false: '#ccc' }} 
                />
              </View>
              
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Frecuencia diaria</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    style={[styles.valueText, styles.valueTextNumeric]}
                    value={dailyFrequency.toString()}
                    onChangeText={(text) => {
                      const num = parseInt(text);
                      if (!isNaN(num)) setDailyFrequency(num);
                      else if (text === "") setDailyFrequency(0);
                    }}
                    keyboardType="numeric"
                  />
                  <Text style={styles.valueText}>veces</Text>
                </View>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Rango de horas</Text>
                <View style={styles.valueContainer}>
                  <TouchableOpacity 
                    onPress={() => setShowPicker(showPicker === 'start' ? null : 'start')}
                    style={[styles.timeButton, showPicker === 'start' && styles.timeButtonActive]}
                  >
                    <Text style={[styles.valueText, showPicker === 'start' && styles.valueTextActive]}>{startTime}</Text>
                  </TouchableOpacity>
                  <Text style={styles.separatorText}>-</Text>
                  <TouchableOpacity 
                    onPress={() => setShowPicker(showPicker === 'end' ? null : 'end')}
                    style={[styles.timeButton, showPicker === 'end' && styles.timeButtonActive]}
                  >
                    <Text style={[styles.valueText, showPicker === 'end' && styles.valueTextActive]}>{endTime}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showPicker && (
                <View style={styles.pickerContainer}>
                  {Platform.OS === 'ios' && (
                    <View style={styles.pickerHeader}>
                      <TouchableOpacity onPress={() => setShowPicker(null)}>
                        <Text style={styles.doneButtonText}>Listo</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <DateTimePicker
                    value={getPickerDate()}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onTimeChange}
                  />
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AntDesign name="info" size={24} color="#FF6B6B" />
                <Text style={styles.sectionTitle}>Información</Text>
              </View>
              <View style={[styles.settingRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <Text style={styles.settingLabel}>Codigo de la aplicación</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/juanramirez871/learning-languages-kotoba')}>
                  <Text style={[styles.valueText, { color: '#FF6B6B', textDecorationLine: 'underline' }]}>https://github.com/juanramirez871/learning-languages-kotoba</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.settingRow]}>
                <Text style={styles.settingLabel}>Versión de la aplicación</Text>
                <TouchableOpacity>
                  <Text style={[styles.valueText, { color: '#FF6B6B' }]}>1.0.0</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};