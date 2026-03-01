import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="person-circle" size={24} color="#3b82f6" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Edit Profile</Text>
                  <Text style={styles.settingDescription}>Update your information</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="lock-closed" size={24} color="#22c55e" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Change Password</Text>
                  <Text style={styles.settingDescription}>Update security credentials</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fef3c7' }]}>
                  <Ionicons name="shield-checkmark" size={24} color="#f59e0b" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Privacy & Security</Text>
                  <Text style={styles.settingDescription}>Manage your privacy</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fce7f3' }]}>
                  <Ionicons name="notifications" size={24} color="#ec4899" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>Receive push notifications</Text>
                </View>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: '#cbd5e1', true: '#a5b4fc' }}
                thumbColor={pushEnabled ? '#6366f1' : '#f1f5f9'}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#e0e7ff' }]}>
                  <Ionicons name="mail" size={24} color="#6366f1" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Email Notifications</Text>
                  <Text style={styles.settingDescription}>Receive email updates</Text>
                </View>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: '#cbd5e1', true: '#a5b4fc' }}
                thumbColor={emailEnabled ? '#6366f1' : '#f1f5f9'}
              />
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#f3e8ff' }]}>
                  <Ionicons name="moon" size={24} color="#9333ea" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Toggle dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#cbd5e1', true: '#a5b4fc' }}
                thumbColor={darkMode ? '#6366f1' : '#f1f5f9'}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fed7aa' }]}>
                  <Ionicons name="language" size={24} color="#ea580c" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Language</Text>
                  <Text style={styles.settingDescription}>English</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#bbf7d0' }]}>
                  <Ionicons name="location" size={24} color="#16a34a" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Location Services</Text>
                  <Text style={styles.settingDescription}>Allow location access</Text>
                </View>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#cbd5e1', true: '#a5b4fc' }}
                thumbColor={locationEnabled ? '#6366f1' : '#f1f5f9'}
              />
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fecaca' }]}>
                  <Ionicons name="help-circle" size={24} color="#dc2626" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Help Center</Text>
                  <Text style={styles.settingDescription}>Get support and FAQ</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#bfdbfe' }]}>
                  <Ionicons name="chatbubble-ellipses" size={24} color="#2563eb" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Contact Us</Text>
                  <Text style={styles.settingDescription}>Send us a message</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fef08a' }]}>
                  <Ionicons name="star" size={24} color="#ca8a04" />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Rate This App</Text>
                  <Text style={styles.settingDescription}>Share your feedback</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
                  <Ionicons name="log-out" size={24} color="#dc2626" />
                </View>
                <Text style={[styles.settingLabel, { marginLeft: 15 }]}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 80,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 10,
    marginBottom: 30,
  },
});
