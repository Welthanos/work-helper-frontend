import { Colors } from '@/src/constants/Colors';
import { Survey } from '@/src/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SurveyCardProps = {
  survey: Survey;
  isDatesVisible: boolean;
  onPressViewAssessments: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleDates: (id: string) => void;
};

export default React.memo(function SurveyCard({ survey, isDatesVisible, onPressViewAssessments, onEdit, onDelete, onToggleDates }: SurveyCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{survey.title}</Text>
      <Text style={styles.description}>{survey.description}</Text>


      <View style={styles.footer}>
        <TouchableOpacity style={styles.assessmentsButton} onPress={() => onPressViewAssessments(survey.id)} activeOpacity={0.7}>
          <Text style={styles.assessmentsButtonText}>Ver avaliações</Text>
          <MaterialIcons name='keyboard-double-arrow-right' size={20} color={Colors.white} style={{ paddingTop: 2.8 }} />
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => onToggleDates(survey.id)}>
            <MaterialIcons name='date-range' size={26} color={Colors.darkBlue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onEdit(survey.id)}>
            <MaterialIcons name='edit' size={24} color={Colors.darkBlue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(survey.id)}>
            <MaterialIcons name='delete' size={24} color={Colors.darkBlue} />
          </TouchableOpacity>
        </View>
      </View>

      {isDatesVisible && (
        <View style={styles.datesPopover}>
          <View style={styles.datePopoverBlock}>
            <Text style={styles.datePopoverLabel}>Data inicial:</Text>
            <Text style={styles.datePopoverValue}>{survey.startDate}</Text>
          </View>
          <View style={styles.datePopoverBlock}>
            <Text style={styles.datePopoverLabel}>Data final:</Text>
            <Text style={styles.datePopoverValue}>{survey.endDate}</Text>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cyan,
    borderRadius: 10,
    padding: 4,
    elevation: 3
  },
  title: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 500,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 8
  },
  description: {
    backgroundColor: Colors.white,
    color: Colors.darkBlue,
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
  footer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    gap: 5
  },
  assessmentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 5,
    borderRightWidth: 4,
    borderColor: Colors.cyan,
    paddingRight: 16,
    gap: 3
  },
  assessmentsButtonText: {
    color: Colors.white,
    fontWeight: 500,
    fontSize: 15
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  datesPopover: {
    backgroundColor: Colors.darkBlue,
    position: 'absolute',
    flexDirection: 'column',
    bottom: 44,
    right: 115,
    borderRadius: 5,
    padding: 12,
    gap: 5,
    elevation: 3,
    zIndex: 10,
  },
  datePopoverBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  datePopoverLabel: {
    color: Colors.white,
    fontSize: 13
  },
  datePopoverValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 500,
  },
});