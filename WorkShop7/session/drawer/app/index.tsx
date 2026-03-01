import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <Ionicons name="home" size={60} color="#6366f1" />
          <Text style={styles.welcomeTitle}>Welcome Home!</Text>
          <Text style={styles.welcomeSubtitle}>
            This is a beautiful Drawer Navigator example
          </Text>
        </View>

        {/* Info Cards */}
        <View style={styles.grid}>
          <View style={[styles.card, { backgroundColor: '#dbeafe' }]}>
            <Ionicons name="document-text" size={40} color="#3b82f6" />
            <Text style={styles.cardTitle}>Documents</Text>
            <Text style={styles.cardValue}>24</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#dcfce7' }]}>
            <Ionicons name="images" size={40} color="#22c55e" />
            <Text style={styles.cardTitle}>Photos</Text>
            <Text style={styles.cardValue}>156</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#fef3c7' }]}>
            <Ionicons name="notifications" size={40} color="#f59e0b" />
            <Text style={styles.cardTitle}>Notifications</Text>
            <Text style={styles.cardValue}>8</Text>
          </View>

          <View style={[styles.card, { backgroundColor: '#fce7f3' }]}>
            <Ionicons name="star" size={40} color="#ec4899" />
            <Text style={styles.cardTitle}>Favorites</Text>
            <Text style={styles.cardValue}>42</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Create New</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Download Files</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Share Content</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={30} color="#f59e0b" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>
              Swipe from the left edge or tap the menu icon to open the drawer!
            </Text>
          </View>
        </View>
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
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 15,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 10,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    marginLeft: 15,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 20,
  },
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#78350f',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
});
