import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* App Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="phone-portrait" size={60} color="#ffffff" />
          </View>
          <Text style={styles.appName}>Drawer Navigator</Text>
          <Text style={styles.appTagline}>Beautiful Navigation Example</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.descriptionTitle}>About This App</Text>
            <Text style={styles.descriptionText}>
              This is a comprehensive example of implementing a Drawer Navigator in React Native with Expo Router. 
              It demonstrates best practices for navigation, beautiful UI design, and smooth user experience.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.card}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#dbeafe' }]}>
                <Ionicons name="menu" size={24} color="#3b82f6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Drawer Navigation</Text>
                <Text style={styles.featureDescription}>Smooth drawer navigation with custom content</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#dcfce7' }]}>
                <Ionicons name="color-palette" size={24} color="#22c55e" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Beautiful UI</Text>
                <Text style={styles.featureDescription}>Modern and clean interface design</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#fef3c7' }]}>
                <Ionicons name="rocket" size={24} color="#f59e0b" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Fast Performance</Text>
                <Text style={styles.featureDescription}>Optimized for smooth animations</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#fce7f3' }]}>
                <Ionicons name="code-slash" size={24} color="#ec4899" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Clean Code</Text>
                <Text style={styles.featureDescription}>Well-structured and maintainable</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built With</Text>
          <View style={styles.card}>
            <View style={styles.techItem}>
              <Ionicons name="logo-react" size={28} color="#61dafb" />
              <Text style={styles.techText}>React Native</Text>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="compass" size={28} color="#6366f1" />
              <Text style={styles.techText}>Expo Router</Text>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="flower" size={28} color="#22c55e" />
              <Text style={styles.techText}>React Navigation</Text>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="code-working" size={28} color="#f59e0b" />
              <Text style={styles.techText}>TypeScript</Text>
            </View>
          </View>
        </View>

        {/* Contact & Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => openWebsite('https://github.com')}
            >
              <View style={[styles.linkIcon, { backgroundColor: '#1f2328' }]}>
                <Ionicons name="logo-github" size={24} color="#ffffff" />
              </View>
              <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>GitHub</Text>
                <Text style={styles.linkUrl}>github.com/yourrepo</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => openWebsite('https://twitter.com')}
            >
              <View style={[styles.linkIcon, { backgroundColor: '#1da1f2' }]}>
                <Ionicons name="logo-twitter" size={24} color="#ffffff" />
              </View>
              <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>Twitter</Text>
                <Text style={styles.linkUrl}>@yourhandle</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => openWebsite('https://linkedin.com')}
            >
              <View style={[styles.linkIcon, { backgroundColor: '#0077b5' }]}>
                <Ionicons name="logo-linkedin" size={24} color="#ffffff" />
              </View>
              <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>LinkedIn</Text>
                <Text style={styles.linkUrl}>linkedin.com/in/yourprofile</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => openWebsite('mailto:contact@example.com')}
            >
              <View style={[styles.linkIcon, { backgroundColor: '#ea4335' }]}>
                <Ionicons name="mail" size={24} color="#ffffff" />
              </View>
              <View style={styles.linkContent}>
                <Text style={styles.linkTitle}>Email</Text>
                <Text style={styles.linkUrl}>contact@example.com</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Licenses</Text>
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2026 Drawer Navigator App</Text>
          <Text style={styles.copyrightSub}>Made with using React Native</Text>
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
  logoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  version: {
    fontSize: 14,
    color: '#94a3b8',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  techText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    marginLeft: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContent: {
    marginLeft: 16,
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  linkUrl: {
    fontSize: 13,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  legalText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  copyright: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  copyrightSub: {
    fontSize: 13,
    color: '#94a3b8',
  },
});
