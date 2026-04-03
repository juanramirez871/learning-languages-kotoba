import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSettings } from '@/context/SettingsContext';


interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isVisible, onClose }) => {
  const { 
    isSoundEnabled, 
    setSoundEnabled, 
    isNotificationsEnabled, 
    setNotificationsEnabled 
  } = useSettings();

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
                  <Text style={styles.valueText}>5 veces</Text>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </View>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Rango de horas</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>09:00 - 21:00</Text>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AntDesign name="info" size={24} color="#FF6B6B" />
                <Text style={styles.sectionTitle}>Información</Text>
              </View>
              <View style={[styles.settingRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <Text style={styles.settingLabel}>Codigo de la aplicación</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/juanramirez871/learning-languages')}>
                  <Text style={[styles.valueText, { color: '#FF6B6B', textDecorationLine: 'underline' }]}>https://github.com/juanramirez871/learning-languages</Text>
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