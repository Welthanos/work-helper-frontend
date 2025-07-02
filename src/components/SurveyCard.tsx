import { Colors } from '@/src/constants/Colors';
import { Survey } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SurveyCardProps = {
  survey: Survey;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default React.memo(function SurveyCard({ survey, onEdit, onDelete }: SurveyCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{survey.titulo}</Text>

      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{survey.descricao}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{survey.tipo}</Text>
        </View>

        <View style={styles.footerDetails}>
          <Text style={styles.dateText}>{survey.data}</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => onEdit(survey.id)}>
              <MaterialIcons name="edit" size={22} color={Colors.darkBlue} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(survey.id)}>
              <MaterialIcons name="delete" size={22} color={Colors.darkBlue} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    padding: 3,
    elevation: 6
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'left',
    paddingHorizontal: 12,
    paddingBottom: 5,
    paddingTop: 2,
  },
  descriptionWrapper: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 3,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.darkBlue,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  badge: {
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  footerDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderBottomEndRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  dateText: {
    color: Colors.darkBlue,
    fontSize: 16
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30
  },
});