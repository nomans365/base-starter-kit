import { dashboardMock } from '~/mocks/dashboard/dashboardMock'
import type { DashboardStats } from '~/types/dashboard'

export async function getDashboardStatistics(): Promise<DashboardStats> {
  return dashboardMock
}
