import React from 'react';
import { ScrollView, Dimensions, Platform } from 'react-native';
import { YStack, XStack, Text, useTheme, ListItem, Avatar } from 'tamagui';
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts';
import { Package, AlertTriangle, TrendingDown, BarChart3, ShoppingCart } from '@tamagui/lucide-icons';
import { useThemeContext } from '../../contexts/ThemeContext';

const DashboardTab = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const { width: screenWidth } = Dimensions.get('window');
  const isAndroid = Platform.OS === 'android';

  const colors = {
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    primary: '#007AFF',
    success: '#11b3e4ff',
    warning: '#F59E0B',
    danger: '#EF4444',
    accent: '#374151',
  };

  // Dados do estoque (sincronizados com EstoqueTab)
  const stockData = {
    totalProducts: 4,
    lowStockProducts: 1,
    criticalProducts: 1,
    normalProducts: 2,
  };

  const barData = [
    {
      value: 15,
      label: 'Jan',
      frontColor: colors.primary,
      labelTextStyle: { color: colors.secondaryText, fontSize: 12 },
      topLabelComponent: () => (
        <Text fontSize={12} fontWeight="600" color={colors.text} textAlign="center">
          15
        </Text>
      )
    },
    {
      value: 30,
      label: 'Fev',
      frontColor: colors.primary,
      labelTextStyle: { color: colors.secondaryText, fontSize: 12 },
      topLabelComponent: () => (
        <Text fontSize={12} fontWeight="600" color={colors.text} textAlign="center">
          30
        </Text>
      )
    },
    {
      value: 26,
      label: 'Mar',
      frontColor: colors.primary,
      labelTextStyle: { color: colors.secondaryText, fontSize: 12 },
      topLabelComponent: () => (
        <Text fontSize={12} fontWeight="600" color={colors.text} textAlign="center">
          26
        </Text>
      )
    },
    {
      value: 40,
      label: 'Abr',
      frontColor: colors.primary,
      labelTextStyle: { color: colors.secondaryText, fontSize: 12 },
      topLabelComponent: () => (
        <Text fontSize={12} fontWeight="600" color={colors.text} textAlign="center">
          40
        </Text>
      )
    },
  ];

  const pieData = [
    { value: 54, color: colors.success, text: '54%' },
    { value: 30, color: colors.warning, text: '30%' },
    { value: 16, color: colors.danger, text: '16%' },
  ];

  // Dados do gráfico de estoque
  const stockPieData = [
    {
      value: (stockData.normalProducts / stockData.totalProducts) * 100,
      color: colors.success,
      text: `${Math.round((stockData.normalProducts / stockData.totalProducts) * 100)}%`
    },
    {
      value: (stockData.lowStockProducts / stockData.totalProducts) * 100,
      color: colors.warning,
      text: `${Math.round((stockData.lowStockProducts / stockData.totalProducts) * 100)}%`
    },
    {
      value: (stockData.criticalProducts / stockData.totalProducts) * 100,
      color: colors.danger,
      text: `${Math.round((stockData.criticalProducts / stockData.totalProducts) * 100)}%`
    },
  ];

  const stockBarData = [
    { value: stockData.normalProducts, label: 'Normal', frontColor: colors.success },
    { value: stockData.lowStockProducts, label: 'Baixo', frontColor: colors.warning },
    { value: stockData.criticalProducts, label: 'Crítico', frontColor: colors.danger },
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
    <ScrollView style={{ flex: 1 }}>
      <YStack padding="$4" gap="$4" paddingBottom="$20">

        {/* Alertas Importantes do Estoque */}
        <YStack gap="$3">
          <Text fontSize={18} fontWeight="600" color={colors.text}>
            Alertas Importantes
          </Text>

          {stockData.criticalProducts > 0 && (
            <YStack
              backgroundColor={isDarkMode ? `${colors.danger}20` : `${colors.danger}15`}
              borderRadius="$4"
              borderWidth={2}
              borderColor={colors.danger}
              padding="$4"
              shadowColor={colors.danger}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.2}
              shadowRadius={4}
              elevation={isAndroid ? 3 : 2}
            >
              <XStack alignItems="center" gap="$3" width="100%">
                <YStack
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor={colors.danger}
                  justifyContent="center"
                  alignItems="center"
                >
                  <AlertTriangle size={20} color="white" />
                </YStack>
                <YStack flex={1}>
                  <Text fontSize={16} fontWeight="700" color={colors.danger}>
                    Atenção: Estoque Crítico
                  </Text>
                  <Text fontSize={14} color={colors.text} marginTop="$1">
                    {stockData.criticalProducts} produto(s) com estoque muito baixo
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          )}

          {stockData.lowStockProducts > 0 && (
            <YStack
              backgroundColor={isDarkMode ? `${colors.warning}20` : `${colors.warning}15`}
              borderRadius="$4"
              borderWidth={2}
              borderColor={colors.warning}
              padding="$4"
              shadowColor={colors.warning}
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.2}
              shadowRadius={4}
              elevation={isAndroid ? 3 : 2}
            >
              <XStack alignItems="center" gap="$3" width="100%">
                <YStack
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor={colors.warning}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Package size={20} color="white" />
                </YStack>
                <YStack flex={1}>
                  <Text fontSize={16} fontWeight="700" color={colors.warning}>
                    Reposição Necessária
                  </Text>
                  <Text fontSize={14} color={colors.text} marginTop="$1">
                    {stockData.lowStockProducts} produto(s) com estoque baixo
                  </Text>
                </YStack>
              </XStack>
            </YStack>
          )}
        </YStack>



        {/* Gráfico de Status do Estoque */}
        <YStack
          bg={colors.cardBackground}
          padding="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor={colors.border}
          shadowColor={isDarkMode ? "#000000" : "#000000"}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={isDarkMode ? 0.5 : 0.1}
          shadowRadius={4}
          elevation={isAndroid ? 5 : 3}
        >
          <Text
            fontSize={18}
            fontWeight="600"
            color={colors.text}
            marginBottom="$4"
          >
            Distribuição do Estoque
          </Text>
          <YStack alignItems="center" marginVertical="$4">
            <PieChart
              data={stockPieData}
              donut
              radius={screenWidth > 400 ? 80 : 70}
              innerRadius={screenWidth > 400 ? 50 : 45}
              showText={false}
              textColor={colors.text}
              textSize={12}
              backgroundColor={colors.cardBackground}
              centerLabelComponent={() => (
                <YStack alignItems="center">
                  <Text
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.text}
                  >
                    {stockData.totalProducts}
                  </Text>
                  <Text
                    fontSize={12}
                    color={colors.secondaryText}
                  >
                    produtos
                  </Text>
                </YStack>
              )}
            />
          </YStack>
          <YStack gap="$3" marginTop="$4">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.success}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Normal
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.success}>
                {Math.round((stockData.normalProducts / stockData.totalProducts) * 100)}%
              </Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.warning}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Baixo
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.warning}>
                {Math.round((stockData.lowStockProducts / stockData.totalProducts) * 100)}%
              </Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.danger}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Crítico
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.danger}>
                {Math.round((stockData.criticalProducts / stockData.totalProducts) * 100)}%
              </Text>
            </XStack>
          </YStack>
        </YStack>





        {/* Card Ordens por Mês */}
        <YStack
          bg={colors.cardBackground}
          padding="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor={colors.border}
          shadowColor={isDarkMode ? "#000000" : "#000000"}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={isDarkMode ? 0.5 : 0.1}
          shadowRadius={4}
          elevation={isAndroid ? 5 : 3}
        >
          <Text
            fontSize={18}
            fontWeight="600"
            color={colors.text}
            marginBottom="$4"
          >
            Ordens de Serviço por Mês
          </Text>
          <YStack alignItems="center" overflow="hidden">
            <BarChart
              data={barData}
              barWidth={screenWidth > 400 ? 40 : 32}
              barBorderRadius={4}
              frontColor={colors.primary}
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor={colors.border}
              hideRules={false}
              rulesColor={colors.border}
              rulesType="solid"
              backgroundColor={colors.cardBackground}
              xAxisLabelTextStyle={{
                color: colors.secondaryText,
                fontSize: 12,
                fontWeight: '500'
              }}
              yAxisTextStyle={{
                color: colors.secondaryText,
                fontSize: 12
              }}
              height={screenWidth > 400 ? 200 : 180}
              width={screenWidth - 120}
              spacing={screenWidth > 400 ? 25 : 20}
            />
          </YStack>
        </YStack>

        {/* Card Status das Ordens */}
        <YStack
          bg={colors.cardBackground}
          padding="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor={colors.border}
          shadowColor={isDarkMode ? "#000000" : "#000000"}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={isDarkMode ? 0.5 : 0.1}
          shadowRadius={4}
          elevation={isAndroid ? 5 : 3}
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
              radius={screenWidth > 400 ? 90 : 80}
              innerRadius={screenWidth > 400 ? 60 : 50}
              showText={false}
              textColor={colors.text}
              textSize={14}
              fontWeight="bold"
              backgroundColor={colors.cardBackground}
              centerLabelComponent={() => (
                <YStack alignItems="center">
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    color={colors.text}
                  >
                    Total
                  </Text>
                  <Text
                    fontSize={12}
                    color={colors.secondaryText}
                  >
                    ordens
                  </Text>
                </YStack>
              )}
            />
          </YStack>
          <YStack gap="$3" marginTop="$4">
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.success}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Finalizadas
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.success}>
                54%
              </Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.warning}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Em Andamento
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.warning}>
                30%
              </Text>
            </XStack>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack
                  width={16}
                  height={16}
                  borderRadius={8}
                  backgroundColor={colors.danger}
                />
                <Text fontSize={14} fontWeight="500" color={colors.text}>
                  Pendentes
                </Text>
              </XStack>
              <Text fontSize={16} fontWeight="bold" color={colors.danger}>
                16%
              </Text>
            </XStack>
          </YStack>
        </YStack>


      </YStack>
    </ScrollView>
  );
};

export default DashboardTab;