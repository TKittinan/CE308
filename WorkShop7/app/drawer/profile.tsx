import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color="#ffffff" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={[styles.statItem, styles.statDivider]}>
            <Text style={styles.statValue}>2.5K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>342</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#6366f1" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>+66 123 456 789</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#6366f1" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>Bangkok, Thailand</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#6366f1" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Joined</Text>
                <Text style={styles.infoValue}>January 2024</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="briefcase" size={20} color="#6366f1" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Occupation</Text>
                <Text style={styles.infoValue}>Software Developer</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            <View style={[styles.achievementCard, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="trophy" size={32} color="#f59e0b" />
              <Text style={styles.achievementText}>Top Contributor</Text>
            </View>
            <View style={[styles.achievementCard, { backgroundColor: '#dbeafe' }]}>
              <Ionicons name="star" size={32} color="#3b82f6" />
              <Text style={styles.achievementText}>5 Star Rating</Text>
            </View>
            <View style={[styles.achievementCard, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="checkmark-circle" size={32} color="#22c55e" />
              <Text style={styles.achievementText}>Verified User</Text>
            </View>
            <View style={[styles.achievementCard, { backgroundColor: '#fce7f3' }]}>
              <Ionicons name="flame" size={32} color="#ec4899" />
              <Text style={styles.achievementText}>30 Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.bioCard}>
            <Text style={styles.bioText}>
              Passionate about creating beautiful mobile applications and learning new technologies. 
              Love to share knowledge and help others grow in their development journey.
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
  profileHeader: {
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366f1',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editProfileText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e2e8f0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 10,
    textAlign: 'center',
  },
  bioCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bioText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
});
