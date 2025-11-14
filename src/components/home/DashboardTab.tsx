import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, useTheme } from 'tamagui';
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts';

const DashboardTab = () => {
  const theme = useTheme();
  const isDark = theme.background.val === '#000000' || theme.background.val === 'rgb(0, 0, 0)';

  const colors = {
   
    cardBackground: theme.backgroundFocus.val,
    text: theme.color.val,
    secondaryText: theme.colorFocus.val,
    primary: '#007AFF',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
  };

  const barData = [
    { value: 15, label: 'Jan', frontColor: colors.primary },
    { value: 30, label: 'Fev', frontColor: colors.primary },
    { value: 26, label: 'Mar', frontColor: colors.primary },
    { value: 40, label: 'Abr', frontColor: colors.primary },
  ];

  const pieData = [
    { value: 54, color: colors.success, text: '54%' },
    { value: 30, color: colors.warning, text: '30%' },
    { value: 16, color: colors.danger, text: '16%' },
  ];

  const lineData = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 100 },
  ];

  const areaData = [
    { value: 50, label: 'Seg' },
    { value: 80, label: 'Ter' },
    { value: 90, label: 'Qua' },
    { value: 70, label: 'Qui' },
    { value: 100, label: 'Sex' },
  ];

  return (
    <ScrollView style={{ flex: 1,  }}>
      <YStack padding="$4" gap="$4">
        {/* Card Ordens por Mês */}
        <YStack
          bg={"$gray1Dark"}
          padding="$4"
          borderRadius="$4"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={3}
        >
          <Text 
            fontSize={18} 
            fontWeight="600" 
            color={colors.text}
            marginBottom="$4"
          >
            Ordens de Serviço por Mês
          </Text>
          <BarChart
            data={barData}
            barWidth={40}
            barBorderRadius={4}
            frontColor={colors.primary}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            xAxisLabelTextStyle={{ color: colors.secondaryText }}
            yAxisTextStyle={{ color: colors.secondaryText }}
          />
        </YStack>

        {/* Card Status das Ordens */}
        <YStack
          bg={"$gray1Dark"}
          padding="$4"
          borderRadius="$4"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={3}
        >
          <Text 
            fontSize={18} 
            fontWeight="600" 
            color={colors.text}
            marginBottom="$4"
          >
            Status das Ordens
          </Text>
          <YStack alignItems="center" marginVertical="$4">
            <PieChart
              data={pieData}
              donut
              radius={80}
              innerRadius={50}
              centerLabelComponent={() => (
                <Text 
                  fontSize={16} 
                  fontWeight="bold"
                  color={colors.text}
                >
                  Total
                </Text>
              )}
            />
          </YStack>
          <XStack justifyContent="space-around" marginTop="$4">
            <XStack alignItems="center" gap="$2">
              <YStack 
                width={12} 
                height={12} 
                borderRadius={6} 
                backgroundColor={colors.success}
              />
              <Text fontSize={12} color={colors.secondaryText}>
                Finalizadas
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <YStack 
                width={12} 
                height={12} 
                borderRadius={6} 
                backgroundColor={colors.warning}
              />
              <Text fontSize={12} color={colors.secondaryText}>
                Em Andamento
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <YStack 
                width={12} 
                height={12} 
                borderRadius={6} 
                backgroundColor={colors.danger}
              />
              <Text fontSize={12} color={colors.secondaryText}>
                Pendentes
              </Text>
            </XStack>
          </XStack>
        </YStack>

        {/* Card Tendência Semanal */}
        <YStack
          bg={"$gray1Dark"}
          padding="$4"
          borderRadius="$4"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}
          elevation={3}
          marginBottom="$4"
        >
          <Text 
            fontSize={18} 
            fontWeight="600" 
            color={colors.text}
            marginBottom="$4"
          >
            Tendência Semanal
          </Text>
          <LineChart
            data={lineData}
            color={colors.primary}
            thickness={3}
            curved
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0}
            dataPointsColor={colors.primary}
            areaChart
            startFillColor={colors.primary}
            endFillColor={`${colors.primary}30`}
            startOpacity={0.6}
            endOpacity={0.1}
          />
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default DashboardTab;