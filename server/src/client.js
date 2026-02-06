// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';

// General
import { exposeServicesClient } from './services/expose-services/expose-services.shared.js';
import { servicesClient } from './services/services/services.shared.js';
import { appsClient } from './services/apps/apps.shared.js';
import { jobsClient } from './services/jobs/jobs.shared.js';
import { actionsClient } from './services/actions/actions.shared.js';
import { workflowsClient } from './services/workflows/workflows.shared.js';
import { sourcesClient } from './services/sources/sources.shared.js';
import { receiverPayloadsClient } from './services/receiver-payloads/receiver-payloads.shared.js';
import { receiversClient } from './services/receivers/receivers.shared.js';
import { webhooksClient } from './services/webhooks/webhooks.shared.js';
import { downloadsClient } from './services/downloads/downloads.shared.js';
import { userClient } from './services/users/users.shared.js';
import { jobScriptsClient } from './services/job-scripts/job-scripts.shared.js';
import { authorizationCodesClient } from './services/authorization-codes/authorization-codes.shared.js';
import { tokensClient } from './services/tokens/tokens.shared.js';
import { clientsClient } from './services/clients/clients.shared.js';
import { variablesClient } from './services/variables/variables.shared.js';
import { generalAiClient } from './services/AI/general-ai/general-ai.shared.js';
import { aiSettingsClient } from './services/AI/ai-settings/ai-settings.shared.js';
import { aiUsageClient } from './services/AI/ai-usage/ai-usage.shared.js';
import { iterationsClient } from './services/iterations/iterations.shared.js';
import { componentsClient } from './services/components/components.shared.js';
import { publishedComponentsClient } from './services/published-components/published-components.shared.js';
import { cleanupCollectionsClient } from './services/cleanup-collections/cleanup-collections.shared.js';
import { genClientScriptsClient } from './services/gen-client-scripts/gen-client-scripts.shared.js';

// Google
import { authGoogleClient } from './services/Google/auth-google/auth-google.shared.js';
import { placesClient } from './services/Google/Maps/places/places.shared.js';
import {geocodeAddressClient} from './services/Google/Maps/geocode/address/geocodeAddress.shared.js';
import {geocodeLocationClient} from './services/Google/Maps/geocode/location/geocodeLocation.shared.js';
import {geocodePlacesClient} from './services/Google/Maps/geocode/places/geocodePlaces.shared.js';
import { accountsClient as gmbAccountsClient } from './services/Google/MyBusinessAccountManagement/accounts/accounts.shared.js';
import { locationsClient as gmbLocationsClient } from './services/Google/MyBusinessBusinessInformation/locations/locations.shared.js';
import { questionsClient as gmbQuestionsClient } from './services/Google/MyBusinessBusinessQandA/questions/questions.shared.js';
import { answersClient as gmbAnswersClient } from './services/Google/MyBusinessBusinessQandA/answers/answers.shared.js';
import { mediaClient as gmbMediaClient } from './services/Google/GoogleMyBusinessV4Services/media/media.shared.js';
import { reviewsClient as gmbReviewsClient } from './services/Google/GoogleMyBusinessV4Services/reviews/reviews.shared.js';
import { mediaCustomersClient as gmbMediaCustomersClient } from './services/Google/GoogleMyBusinessV4Services/media-customers/media-customers.shared.js';
import { localPostsClient as gmbLocalPostsClient } from './services/Google/GoogleMyBusinessV4Services/local-posts/local-posts.shared.js';
import { attributesClient as gmbAttributesClient } from './services/Google/MyBusinessBusinessInformation/attributes/attributes.shared.js';
import { placeActionLinksClient as gmbPlaceActionLinksClient } from './services/Google/MyBusinessPlaceActions/placeActionLinks/placeActionLinks.shared.js';
import { locationsClient as gmbVerificationsLocationsClient } from './services/Google/MyBusinessVerifications/locations/locations.shared.js';
import { verificationsClient as gmbVerificationsClient } from './services/Google/MyBusinessVerifications/verifications/verifications.shared.js';
import { authGoogleAdsClient } from './services/Google/auth-google-ads/auth-google-ads.shared.js';
import { googleAdsClient } from './services/Google/GoogleAds/google-ads.shared.js';
import { googleAdsRawClient } from './services/Google/GoogleAdsRaw/google-ads-raw.shared.js';
import { spreadsheetsClient as gSpreadsheetsClient } from './services/Google/GoogleSheets/spreadsheets/spreadsheets.shared.js';
import { spreadsheetsValuesClient as gSpreadsheetsValuesClient } from './services/Google/GoogleSheets/spreadsheetsValues/spreadsheets-values.shared.js';
import { urlInspectionClient as gUrlInspectionClient } from './services/Google/SearchConsole/urlInspection/urlInspection.shared.js';
import { sitemapsClient as gSitemapsClient } from './services/Google/SearchConsole/sitemaps/sitemaps.shared.js';

// Podium
import { contactsClient as pContactsClient } from './services/Podium/contacts/contacts.shared.js';
import { campaignsClient as pCampaignsClient } from './services/Podium/campaigns/campaigns.shared.js';
import { locationsClient as pLocationsClient } from './services/Podium/locations/locations.shared.js';
import { organizationsClient as pOrganizationsClient } from './services/Podium/organizations/organizations.shared.js';
import { usersClient as pUsersClient } from './services/Podium/users/users.shared.js';
import { appointmentsClient as pAppointmentsClient } from './services/Podium/appointments/appointments.shared.js';
import { campaignInteractionsClient as pCampaignInteractionsClient } from './services/Podium/campaign_interactions/campaign_interactions.shared.js';
import { messagesClient as pCampaignMessagesClient } from './services/Podium/campaignsSubServices/messages/messages.shared.js';
import { contactAttributesClient as pContactAttributesClient } from './services/Podium/contact_attributes/contact_attributes.shared.js';
import { contactTagsClient as pContactTagsClient } from './services/Podium/contact_tags/contact_tags.shared.js';
import { attributesClient as pAttributesClient } from './services/Podium/contactsSubServices/attributes/attributes.shared.js';
import { tagsClient as pTagsClient } from './services/Podium/contactsSubServices/tags/tags.shared.js';
import { conversationsClient as pConversationsClient } from './services/Podium/conversations/conversations.shared.js';
import { leadWritebackClient as pLeadWritebackClient } from './services/Podium/conversationsSubServices/lead_writeback/lead_writeback.shared.js';
import { messagesClient as pConversationMessagesClient } from './services/Podium/conversationsSubServices/messages/messages.shared.js';
import { notesClient as pNotesClient } from './services/Podium/conversationsSubServices/notes/notes.shared.js';
import { feedbackClient as pFeedbackClient } from './services/Podium/feedback/feedback.shared.js';
import { messagesClient as pMessagesClient } from './services/Podium/messages/messages.shared.js';
import { templatesClient as pTemplatesClient } from './services/Podium/templates/templates.shared.js';
import { invoicesClient as pInvoicesClient } from './services/Podium/invoices/invoices.shared.js';
import { paymentsClient as pPaymentsClient } from './services/Podium/payments/payments.shared.js';
import { readersClient as pReadersClient } from './services/Podium/readers/readers.shared.js';
import { refundsClient as pRefundsClient } from './services/Podium/refunds/refunds.shared.js';
import { reviewsClient as pReviewsClient } from './services/Podium/reviews/reviews.shared.js';
import { productsClient as pProductsClient } from './services/Podium/products/products.shared.js';
import { responsesClient as pResponsesClient } from './services/Podium/reviewsSubServices/responses/responses.shared.js';
import { reviewAttributionsClient as pReviewAttributionsClient } from './services/Podium/reviewsSubServices/attributions/attributions.shared.js';
import { authPodiumClient } from './services/Podium/auth-podium/auth-podium.shared.js';

// ServiceTitan
import { callsClient as stCallsClient } from './services/ServiceTitan/calls/calls.shared.js';
import { bookingProviderTagsClient as stBookingProviderTagsClient } from './services/ServiceTitan/booking-provider-tags/booking-provider-tags.shared.js';
import { appointmentsClient as stAppointmentsClient } from './services/ServiceTitan/appointments/appointments.shared.js';
import { locationsClient as stLocationsClient } from './services/ServiceTitan/locations/locations.shared.js';
import { notesClient as stLocationsNotesClient } from './services/ServiceTitan/locationsSubServices/notes/notes.shared.js';
import { contactsClient as stLocationsContactsClient } from './services/ServiceTitan/locationsSubServices/contacts/contacts.shared.js';
import { leadsClient as stLeadsClient } from './services/ServiceTitan/leads/leads.shared.js';
import { notesClient as stLeadsNotesClient } from './services/ServiceTitan//leadsSubServices/notes/notes.shared.js';
import { dismissClient as stLeadsDismissClient } from './services/ServiceTitan//leadsSubServices/dismiss/dismiss.shared.js';
import { followUpClient as stLeadsFollowUpClient } from './services/ServiceTitan//leadsSubServices/follow-up/follow-up.shared.js';
import { customersClient as stCustomersClient } from './services/ServiceTitan/customers/customers.shared.js';
import { contactsClient as stCustomersContactsClient } from './services/ServiceTitan/customersSubServices/contacts/contacts.shared.js';
import { notesClient as stCustomersNotesClient } from './services/ServiceTitan/customersSubServices/notes/notes.shared.js';
import { bulkTagsClient as stBulkTagsClient } from './services/ServiceTitan/bulk-tags/bulk-tags.shared.js';
import { campaignsClient as stCampaignsClient } from './services/ServiceTitan/campaigns/campaigns.shared.js';
import { bookingsClient as stBookingsClient } from './services/ServiceTitan/bookings/bookings.shared.js';
import { contactsClient as stBookingsContactsClient } from './services/ServiceTitan/bookingsSubServices/contacts/contacts.shared.js';
import { invoicesClient as stInvoicesClient } from './services/ServiceTitan/invoices/invoices.shared.js';
import { paymentsClient as stPaymentsClient } from './services/ServiceTitan/payments/payments.shared.js';
import { paymentTermsClient as stPaymentTermsClient } from './services/ServiceTitan/payment-terms/payment-terms.shared.js';
import { paymentTypesClient as stPaymentTypesClient } from './services/ServiceTitan/payment-types/payment-types.shared.js';
import { taxZonesClient as stTaxZonesClient } from './services/ServiceTitan/tax-zones/tax-zones.shared.js';
import { journalEntriesClient as stJournalEntriesClient } from './services/ServiceTitan/journal-entries/journal-entries.shared.js';
import { detailsClient as stJournalEntriesDetailsClient } from './services/ServiceTitan/journalEntriesSubServices/details/details.shared.js';
import { summaryClient as stJournalEntriesSummaryClient } from './services/ServiceTitan/journalEntriesSubServices/summary/summary.shared.js';
import { itemsClient as stInvoiceItemsClient } from './services/ServiceTitan/invoicesSubServices/items/items.shared.js';
import { apCreditsClient as stApCreditsClient } from './services/ServiceTitan/ap-credits/ap-credits.shared.js';
import { apPaymentsClient as stApPaymentsClient } from './services/ServiceTitan/ap-payments/ap-payments.shared.js';
import { inventoryBillsClient as stInventoryBillsClient } from './services/ServiceTitan/inventory-bills/inventory-bills.shared.js';
import { estimatesClient as stEstimatesClient } from './services/ServiceTitan/estimates/estimates.shared.js';
import { jobTypesClient as stJobTypesClient } from './services/ServiceTitan/job-types/job-types.shared.js';
import { jobsClient as stJobsClient } from './services/ServiceTitan/jobs/jobs.shared.js';
import { businessUnitsClient as stBusinessUnitsClient } from './services/ServiceTitan/business-units/business-units.shared.js';
import { categoriesClient as stCategoriesClient } from './services/ServiceTitan/categories/categories.shared.js';
import { projectsClient as stProjectsClient } from './services/ServiceTitan/projects/projects.shared.js';
import { appointmentAssignmentsClient as stAppointmentAssignmentsClient } from './services/ServiceTitan/appointment-assignments/appointment-assignments.shared.js';
import { businessHoursClient as stBusinessHoursClient } from './services/ServiceTitan/business-hours/business-hours.shared.js';
import { capacityClient as stCapacityClient } from './services/ServiceTitan/capacity/capacity.shared.js';
import { arrivalWindowsClient as stArrivalWindowsClient } from './services/ServiceTitan/arrival-windows/arrival-windows.shared.js';
import { nonJobAppointmentsClient as stNonJobAppointmentsClient } from './services/ServiceTitan/non-job-appointments/non-job-appointments.shared.js';
import { teamsClient as stTeamsClient } from './services/ServiceTitan/teams/teams.shared.js';
import { zonesClient as stZonesClient } from './services/ServiceTitan/zones/zones.shared.js';
import { technicianShiftsClient as stTechnicianShiftsClient } from './services/ServiceTitan/technician-shifts/technician-shifts.shared.js';
import { installedEquipmentClient as stInstalledEquipmentClient } from './services/ServiceTitan/installed-equipment/installed-equipment.shared.js';
import { formsClient as stFormsClient } from './services/ServiceTitan/forms/forms.shared.js';
import { submissionsClient as stSubmissionsClient } from './services/ServiceTitan/submissions/submissions.shared.js';
import { attachmentsClient as stAttachmentsClient } from './services/ServiceTitan/attachments/attachments.shared.js';
import { purchaseOrdersClient as stPurchaseOrdersClient } from './services/ServiceTitan/purchase-orders/purchase-orders.shared.js';
import { reportsClient as stReportsClient } from './services/ServiceTitan/reports/reports.shared.js';
import { reportCategoriesClient as stReportCategoriesClient } from './services/ServiceTitan/report-categories/report-categories.shared.js';

// Zoho
import { authZohoClient } from './services/Zoho/auth-zoho/auth-zoho.shared.js';

// Zoho Analytics
import { orgsClient as zaOrgsClient } from './services/Zoho/Analytics/orgs/orgs.shared.js';
import { workspacesClient as zaWorkspacesClient } from './services/Zoho/Analytics/workspaces/workspaces.shared.js';
import { viewsClient as zaViewsClient } from './services/Zoho/Analytics/views/views.shared.js';
import { exportjobsClient as zaExportJobsClient } from './services/Zoho/Analytics/exportjobs/exportjobs.shared.js';

// Zoho Desk
// Endpoints to finish:
// -Account Deduplication
// -Contact Deduplication
// -Entity Followers
// -Records
// -Layouts
// -Layout Rules
// -Validation Rules
// -Dependency Mappings
// -Mail Reply Address
// -Support Email Address
// -Mail Configurations
// -Support Email Domains
// -Locales
// -Agent Signatures
// -Business Hours
// -Blueprints
// -Domain Mapping
// -Community
// -Email Templates
// -Template Folders
// -BugTracker?
// -Jira
// -Badgification
// -Holiday List
// -Notification
// -Data Sharing Rules
// -Agent Availability
// -Automation Feature Count
// -Routing Preference
// -Recycle Bin
// -Subject Access Requests
// -IM Channel
// -IM Session
// -IM Template Message
// -Bulk Upload
// -Bulk Download
import { organizationsClient as zdOrganizationsClient } from './services/Zoho/Desk/organizations/organizations.shared.js';
import { agentsClient as zdAgentsClient } from './services/Zoho/Desk/agents/agents.shared.js';
import { profilesClient as zdProfilesClient } from './services/Zoho/Desk/profiles/profiles.shared.js';
import { rolesClient as zdRolesClient } from './services/Zoho/Desk/roles/roles.shared.js';
import { teamsClient as zdTeamsClient } from './services/Zoho/Desk/teams/teams.shared.js';
import { departmentsClient as zdDepartmentsClient } from './services/Zoho/Desk/departments/departments.shared.js';
import { channelsClient as zdChannelsClient } from './services/Zoho/Desk/channels/channels.shared.js';
import { threadsClient as zdThreadsClient } from './services/Zoho/Desk/ticketsSubServices/threads/threads.shared.js';
import { ticketsClient as zdTicketsClient } from './services/Zoho/Desk/tickets/tickets.shared.js';
import { contactsClient as zdContactsClient } from './services/Zoho/Desk/contacts/contacts.shared.js';
import { accountsClient as zdAccountsClient } from './services/Zoho/Desk/accounts/accounts.shared.js';
import { accountContactMappingClient as zdAccountContactMappingClient } from './services/Zoho/Desk/accountContactMapping/account-contact-mapping.shared.js';
import { tasksClient as zdTasksClient } from './services/Zoho/Desk/tasks/tasks.shared.js';
import { productsClient as zdProductsClient } from './services/Zoho/Desk/products/products.shared.js';
import { helpCentersClient as zdHelpCentersClient } from './services/Zoho/Desk/helpCenters/help-centers.shared.js';
import { usersClient as zdUsersClient } from './services/Zoho/Desk/users/users.shared.js';
import { labelsClient as zdLabelsClient } from './services/Zoho/Desk/labels/labels.shared.js';
import { groupsClient as zdGroupsClient } from './services/Zoho/Desk/groups/groups.shared.js';
import { articlesClient as zdArticlesClient } from './services/Zoho/Desk/articles/articles.shared.js';
import { articleFeedbacksClient as zdArticleFeedbacksClient } from './services/Zoho/Desk/articleFeedbacks/article-feedbacks.shared.js';
import { kbRootCategoriesClient as zdKbRootCategoriesClient } from './services/Zoho/Desk/kbRootCategories/kbRootCategories.shared.js';
import { contractsClient as zdContractsClient } from './services/Zoho/Desk/contracts/contracts.shared.js';
import { timeTrackSettingsClient as zdTimeTrackSettingsClient } from './services/Zoho/Desk/timeTrackSettings/timeTrackSettings.shared.js';
import { viewsClient as zdViewsClient } from './services/Zoho/Desk/views/views.shared.js';
import { searchClient as zdSearchClient } from './services/Zoho/Desk/search/search.shared.js';
import { timeEntryClient as zdTicketTimeEntryClient } from './services/Zoho/Desk/ticketsSubServices/timeEntry/timeEntry.shared.js';
import { approvalsClient as zdApprovalsClient } from './services/Zoho/Desk/ticketsSubServices/approvals/approvals.shared.js';
import { timeEntryClient as zdTaskTimeEntryClient } from './services/Zoho/Desk/tasksSubServices/timeEntry/timeEntry.shared.js';
import { timeEntryClient as zdAgentTimeEntryClient } from './services/Zoho/Desk/agentsSubServices/timeEntry/timeEntry.shared.js';
import { timeEntryClient as zdContactTimeEntryClient } from './services/Zoho/Desk/contactsSubServices/timeEntry/timeEntry.shared.js';
import { timeEntryClient as zdAccountTimeEntryClient } from './services/Zoho/Desk/accountsSubServices/timeEntry/timeEntry.shared.js';
import { timerClient as zdTicketTimerClient } from './services/Zoho/Desk/ticketsSubServices/timer/timer.shared.js';
import { timerClient as zdTaskTimerClient } from './services/Zoho/Desk/tasksSubServices/timer/timer.shared.js';
import { activeTimersClient as zdActiveTimersClient } from './services/Zoho/Desk/activeTimers/activeTimers.shared.js';
import { tagsClient as zdTagsClient } from './services/Zoho/Desk/tags/tags.shared.js';
import { customerHappinessClient as zdCustomerHappinessClient } from './services/Zoho/Desk/customerHappiness/customerHappiness.shared.js';
import { ticketTemplatesClient as zdTicketTemplatesClient } from './services/Zoho/Desk/ticketTemplates/ticketTemplates.shared.js';
import { commentsClient as zdTicketCommentsClient } from './services/Zoho/Desk/ticketsSubServices/comments/comments.shared.js';
import { commentsClient as zdContactCommentsClient } from './services/Zoho/Desk/contactsSubServices/comments/comments.shared.js';
import { commentsClient as zdAccountCommentsClient } from './services/Zoho/Desk/accountsSubServices/comments/comments.shared.js';
import { commentsClient as zdTaskCommentsClient } from './services/Zoho/Desk/tasksSubServices/comments/comments.shared.js';
import { commentsClient as zdArticleCommentsClient } from './services/Zoho/Desk/articlesSubServices/comments/comments.shared.js';
import { commentsClient as zdContractCommentsClient } from './services/Zoho/Desk/contractsSubServices/comments/comments.shared.js';
import { commentsClient as zdCallCommentsClient } from './services/Zoho/Desk/callsSubServices/comments/comments.shared.js';
import { commentsClient as zdEventCommentsClient } from './services/Zoho/Desk/eventsSubServices/comments/comments.shared.js';
import { uploadsClient as zdUploadsClient } from './services/Zoho/Desk/uploads/uploads.shared.js';
import { attachmentsClient as zdTicketAttachmentsClient } from './services/Zoho/Desk/ticketsSubServices/attachments/attachments.shared.js';
import { attachmentsClient as zdContactAttachmentsClient } from './services/Zoho/Desk/contactsSubServices/attachments/attachments.shared.js';
import { attachmentsClient as zdAccountAttachmentsClient } from './services/Zoho/Desk/accountsSubServices/attachments/attachments.shared.js';
import { attachmentsClient as zdTaskAttachmentsClient } from './services/Zoho/Desk/tasksSubServices/attachments/attachments.shared.js';
import { attachmentsClient as zdProductAttachmentsClient } from './services/Zoho/Desk/productsSubServices/attachments/attachments.shared.js';
import { followersClient as zdAccountFollowersClient } from './services/Zoho/Desk/accountsSubServices/followers/followers.shared.js';
import { followersClient as zdContactFollowersClient } from './services/Zoho/Desk/contactsSubServices/followers/followers.shared.js';
import { followersClient as zdTicketFollowersClient } from './services/Zoho/Desk/ticketsSubServices/followers/followers.shared.js';
import { eventsClient as zdCallsClient } from './services/Zoho/Desk/events/events.shared.js';
import { activitiesClient as zdActivitiesClient } from './services/Zoho/Desk/activities/activities.shared.js';
import { callsClient as zdEventsClient } from './services/Zoho/Desk/calls/calls.shared.js';
import { modulesClient as zdModulesClient } from './services/Zoho/Desk/modules/modules.shared.js';
import { organizationFieldsClient as zdOrganizationFieldsClient } from './services/Zoho/Desk/organizationFields/organizationFields.shared.js';
import { dashboardsClient as zdDashboardsClient } from './services/Zoho/Desk/dashboards/dashboards.shared.js';
import { financeClient as zdFinanceClient } from './services/Zoho/Desk/finance/finance.shared.js';
import { estimatesClient as zdEstimatesClient } from './services/Zoho/Desk/financeSubServices/estimates/estimates.shared.js';
import { invoicesClient as zdInvoicesClient } from './services/Zoho/Desk/financeSubServices/invoices/invoices.shared.js';
import { skillsClient as zdSkillsClient } from './services/Zoho/Desk/skills/skills.shared.js';
import { skillTypesClient as zdSkillTypesClient } from './services/Zoho/Desk/skillTypes/skillTypes.shared.js';
import { skillConfigurationsClient as zdSkillConfigurationsClient } from './services/Zoho/Desk/skillConfigurations/skillConfigurations.shared.js';

// Zoho Projects
// Endpoints to finish:
// -Entity Properties
import { portalsClient as zpPortalsClient } from './services/Zoho/Projects/portals/portals.shared.js';
import { portalExportClient as zpPortalExportClient } from './services/Zoho/Projects/portal_export/portal_export.shared.js';
import { projectsClient as zpProjectsClient } from './services/Zoho/Projects/projects/projects.shared.js';
import { statusesClient as zpStatusesClient } from './services/Zoho/Projects/statuses/statuses.shared.js';
import { activitiesClient as zpActivitiesClient } from './services/Zoho/Projects/activities/activities.shared.js';
import { milestonesClient as zpMilestonesClient } from './services/Zoho/Projects/milestones/milestones.shared.js';
import { tasklistsClient as zpTasklistsClient } from './services/Zoho/Projects/tasklists/tasklists.shared.js';
import { tasksClient as zpTasksClient } from './services/Zoho/Projects/tasks/tasks.shared.js';
import { commentsClient as zpTaskCommentsClient } from './services/Zoho/Projects/tasksSubServices/comments/comments.shared.js';
import { subtasksClient as zpSubtasksClient } from './services/Zoho/Projects/tasksSubServices/subtasks/subtasks.shared.js';
import { attachmentsClient as zpTaskAttachmentsClient } from './services/Zoho/Projects/tasksSubServices/attachments/attachments.shared.js';
import { taskDependenciesClient as zpTaskDependenciesClient } from './services/Zoho/Projects/taskDependencies/taskDependencies.shared.js';
import { timesheetsClient as zpTimesheetsClient } from './services/Zoho/Projects/timesheets/timesheets.shared.js';
import { timeLogsClient as zpTaskTimeLogsClient } from './services/Zoho/Projects/tasksSubServices/timeLogs/timeLogs.shared.js';
import { bugsClient as zpBugsClient } from './services/Zoho/Projects/bugs/bugs.shared.js';
import { timeLogsClient as zpBugTimeLogsClient } from './services/Zoho/Projects/bugsSubServices/timeLogs/timeLogs.shared.js';
import { commentsClient as zpBugCommentsClient } from './services/Zoho/Projects/bugsSubServices/comments/comments.shared.js';
import { bugFollowersClient as zpBugFollowersClient } from './services/Zoho/Projects/bugsSubServices/bugFollowers/bugFollowers.shared.js';
import { tagsClient as zpTagsClient } from './services/Zoho/Projects/tags/tags.shared.js';
import { eventsClient as zpEventsClient } from './services/Zoho/Projects/events/events.shared.js';
import { forumsClient as zpForumsClient } from './services/Zoho/Projects/forums/forums.shared.js';
import { categoriesClient as zpCategoriesClient } from './services/Zoho/Projects/forumsSubServices/categories/categories.shared.js';
import { commentsClient as zpForumCommentsClient } from './services/Zoho/Projects/bugsSubServices/comments/comments.shared.js';
import { usersClient as zpUsersClient } from './services/Zoho/Projects/users/users.shared.js';
import { clientsClient as zpClientsClient } from './services/Zoho/Projects/clients/clients.shared.js';
import { contactsClient as zpContactsClient } from './services/Zoho/Projects/contacts/contacts.shared.js';
import { documentsClient as zpDocumentsClient } from './services/Zoho/Projects/documents/documents.shared.js';
import { searchClient as zpSearchClient } from './services/Zoho/Projects/search/search.shared.js';
import { userGroupsClient as zpUserGroupsClient } from './services/Zoho/Projects/userGroups/userGroups.shared.js';

// Zoho CRM
import { usersClient as zcUsersClient } from './services/Zoho/CRM/users/users.shared.js';
import { recordsClient as zcRecordsClient } from './services/Zoho/CRM/records/records.shared.js';
import { modulesClient as zcModulesClient } from './services/Zoho/CRM/modules/modules.shared.js';
import { fieldsClient as zcFieldsClient } from './services/Zoho/CRM/fields/fields.shared.js';

// GoHighLevel
import { contactsClient as ghlContactsClient } from './services/GoHighLevel/contacts/contacts.shared.js';

// WordPress
import {postsClient as wpPostsClient} from './services/WordPress/posts/posts.shared.js';
import {typesClient as wpTypesClient} from './services/WordPress/types/types.shared.js';
import {customRoutesClient as wpCustomRoutesClient} from './services/WordPress/custom-routes/custom-routes.shared.js';
import {mediaClient as wpMediaClient} from './services/WordPress/media/media.shared.js';

// Wix
import { dataItemsClient as wixDataItemsClient } from './services/Wix/data-items/data-items.shared.js';
import { foldersClient as wixMediaFoldersClient } from './services/Wix/media/folders/folders.shared.js';
import { filesClient as wixMediaFilesClient } from './services/Wix/media/files/files.shared.js';

/**
 * Returns a  client for the server app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */

export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers();
  client.configure(connection);
  client.configure(authenticationClient(authenticationOptions));
  client.set('connection', connection);

  // General
  client.configure(exposeServicesClient);
  client.configure(servicesClient);
  client.configure(appsClient);
  client.configure(jobsClient);
  client.configure(actionsClient);
  client.configure(workflowsClient);
  client.configure(sourcesClient);
  client.configure(receiverPayloadsClient);
  client.configure(receiversClient);
  client.configure(webhooksClient);
  client.configure(downloadsClient);
  client.configure(userClient);
  client.configure(jobScriptsClient);
  client.configure(clientsClient);
  client.configure(tokensClient);
  client.configure(authorizationCodesClient);
  client.configure(generalAiClient);
  client.configure(aiSettingsClient);
  client.configure(aiUsageClient);
  client.configure(iterationsClient);
  client.configure(variablesClient);
  client.configure(componentsClient);
  client.configure(publishedComponentsClient);
  client.configure(cleanupCollectionsClient);
  client.configure(genClientScriptsClient);

  // Google
  client.configure(authGoogleClient);
  client.configure(placesClient);
  client.configure(geocodeAddressClient);
  client.configure(geocodeLocationClient);
  client.configure(geocodePlacesClient);
  client.configure(gmbAccountsClient);
  client.configure(gmbLocationsClient);
  client.configure(gmbQuestionsClient);
  client.configure(gmbAnswersClient);
  client.configure(gmbMediaClient);
  client.configure(gmbMediaCustomersClient);
  client.configure(gmbLocalPostsClient);
  client.configure(gmbReviewsClient);
  client.configure(gmbAttributesClient);
  client.configure(gmbPlaceActionLinksClient);
  client.configure(gmbVerificationsLocationsClient);
  client.configure(gmbVerificationsClient);
  client.configure(gSpreadsheetsClient);
  client.configure(gSpreadsheetsValuesClient);
  client.configure(authGoogleAdsClient);
  client.configure(googleAdsClient);
  client.configure(googleAdsRawClient);
  client.configure(gUrlInspectionClient);
  client.configure(gSitemapsClient);

  // Podium
  client.configure(pContactsClient);
  client.configure(pCampaignsClient);
  client.configure(pLocationsClient);
  client.configure(pOrganizationsClient);
  client.configure(pUsersClient);
  client.configure(pAppointmentsClient);
  client.configure(pCampaignInteractionsClient);
  client.configure(pCampaignMessagesClient);
  client.configure(pContactAttributesClient);
  client.configure(pContactTagsClient);
  client.configure(pAttributesClient);
  client.configure(pTagsClient);
  client.configure(pConversationsClient);
  client.configure(pLeadWritebackClient);
  client.configure(pConversationMessagesClient);
  client.configure(pNotesClient);
  client.configure(pFeedbackClient);
  client.configure(pMessagesClient);
  client.configure(pTemplatesClient);
  client.configure(pInvoicesClient);
  client.configure(pPaymentsClient);
  client.configure(pReadersClient);
  client.configure(pRefundsClient);
  client.configure(pReviewsClient);
  client.configure(pProductsClient);
  client.configure(pResponsesClient);
  client.configure(pReviewAttributionsClient);
  client.configure(authPodiumClient);

  // ServiceTitan
  client.configure(stCallsClient);
  client.configure(stBookingProviderTagsClient);
  client.configure(stAppointmentsClient);
  client.configure(stLocationsClient);
  client.configure(stLocationsNotesClient);
  client.configure(stLocationsContactsClient);
  client.configure(stLeadsClient);
  client.configure(stLeadsNotesClient);
  client.configure(stLeadsDismissClient);
  client.configure(stLeadsFollowUpClient);
  client.configure(stCustomersClient);
  client.configure(stCustomersContactsClient);
  client.configure(stCustomersNotesClient);
  client.configure(stBulkTagsClient);
  client.configure(stCampaignsClient);
  client.configure(stBookingsClient);
  client.configure(stBookingsContactsClient);
  client.configure(stInvoicesClient);
  client.configure(stPaymentsClient);
  client.configure(stPaymentTermsClient);
  client.configure(stPaymentTypesClient);
  client.configure(stTaxZonesClient);
  client.configure(stJournalEntriesClient);
  client.configure(stJournalEntriesDetailsClient);
  client.configure(stJournalEntriesSummaryClient);
  client.configure(stInvoiceItemsClient);
  client.configure(stEstimatesClient);
  client.configure(stJobTypesClient);
  client.configure(stJobsClient);
  client.configure(stBusinessUnitsClient);
  client.configure(stApCreditsClient);
  client.configure(stApPaymentsClient);
  client.configure(stInventoryBillsClient);
  client.configure(stCategoriesClient);
  client.configure(stProjectsClient);
  client.configure(stAppointmentAssignmentsClient);
  client.configure(stBusinessHoursClient);
  client.configure(stCapacityClient);
  client.configure(stArrivalWindowsClient);
  client.configure(stNonJobAppointmentsClient);
  client.configure(stTeamsClient);
  client.configure(stZonesClient);
  client.configure(stTechnicianShiftsClient);
  client.configure(stInstalledEquipmentClient);
  client.configure(stFormsClient);
  client.configure(stSubmissionsClient);
  client.configure(stAttachmentsClient);
  client.configure(stPurchaseOrdersClient);
  client.configure(stReportsClient);
  client.configure(stReportCategoriesClient);

  // Zoho
  client.configure(authZohoClient);

  // Zoho Analytics
  client.configure(zaOrgsClient);
  client.configure(zaWorkspacesClient);
  client.configure(zaViewsClient);
  client.configure(zaExportJobsClient);

  // Zoho Desk
  client.configure(zdOrganizationsClient);
  client.configure(zdAgentsClient);
  client.configure(zdProfilesClient);
  client.configure(zdRolesClient);
  client.configure(zdTeamsClient);
  client.configure(zdDepartmentsClient);
  client.configure(zdChannelsClient);
  client.configure(zdThreadsClient);
  client.configure(zdTicketsClient);
  client.configure(zdContactsClient);
  client.configure(zdAccountsClient);
  client.configure(zdAccountContactMappingClient);
  client.configure(zdTasksClient);
  client.configure(zdProductsClient);
  client.configure(zdHelpCentersClient);
  client.configure(zdUsersClient);
  client.configure(zdLabelsClient);
  client.configure(zdGroupsClient);
  client.configure(zdArticlesClient);
  client.configure(zdArticleFeedbacksClient);
  client.configure(zdKbRootCategoriesClient);
  client.configure(zdContractsClient);
  client.configure(zdTimeTrackSettingsClient);
  client.configure(zdViewsClient);
  client.configure(zdSearchClient);
  client.configure(zdTicketTimeEntryClient);
  client.configure(zdApprovalsClient);
  client.configure(zdTaskTimeEntryClient);
  client.configure(zdAgentTimeEntryClient);
  client.configure(zdContactTimeEntryClient);
  client.configure(zdAccountTimeEntryClient);
  client.configure(zdTicketTimerClient);
  client.configure(zdTaskTimerClient);
  client.configure(zdActiveTimersClient);
  client.configure(zdTagsClient);
  client.configure(zdCustomerHappinessClient);
  client.configure(zdTicketTemplatesClient);
  client.configure(zdTicketCommentsClient);
  client.configure(zdContactCommentsClient);
  client.configure(zdAccountCommentsClient);
  client.configure(zdTaskCommentsClient);
  client.configure(zdArticleCommentsClient);
  client.configure(zdContractCommentsClient);
  client.configure(zdCallCommentsClient);
  client.configure(zdEventCommentsClient);
  client.configure(zdUploadsClient);
  client.configure(zdTicketAttachmentsClient);
  client.configure(zdContactAttachmentsClient);
  client.configure(zdAccountAttachmentsClient);
  client.configure(zdTaskAttachmentsClient);
  client.configure(zdProductAttachmentsClient);
  client.configure(zdAccountFollowersClient);
  client.configure(zdContactFollowersClient);
  client.configure(zdTicketFollowersClient);
  client.configure(zdEventsClient);
  client.configure(zdActivitiesClient);
  client.configure(zdCallsClient);
  client.configure(zdModulesClient);
  client.configure(zdOrganizationFieldsClient);
  client.configure(zdDashboardsClient);
  client.configure(zdFinanceClient);
  client.configure(zdEstimatesClient);
  client.configure(zdInvoicesClient);
  client.configure(zdSkillsClient);
  client.configure(zdSkillTypesClient);
  client.configure(zdSkillConfigurationsClient);

  // Zoho Projects
  client.configure(zpPortalsClient);
  client.configure(zpPortalExportClient);
  client.configure(zpProjectsClient);
  client.configure(zpStatusesClient);
  client.configure(zpActivitiesClient);
  client.configure(zpMilestonesClient);
  client.configure(zpTasklistsClient);
  client.configure(zpTasksClient);
  client.configure(zpTaskCommentsClient);
  client.configure(zpSubtasksClient);
  client.configure(zpTaskAttachmentsClient);
  client.configure(zpTaskDependenciesClient);
  client.configure(zpTimesheetsClient);
  client.configure(zpTaskTimeLogsClient);
  client.configure(zpBugsClient);
  client.configure(zpBugTimeLogsClient);
  client.configure(zpBugCommentsClient);
  client.configure(zpBugFollowersClient);
  client.configure(zpTagsClient);
  client.configure(zpEventsClient);
  client.configure(zpForumsClient);
  client.configure(zpCategoriesClient);
  client.configure(zpForumCommentsClient);
  client.configure(zpUsersClient);
  client.configure(zpClientsClient);
  client.configure(zpContactsClient);
  client.configure(zpDocumentsClient);
  client.configure(zpSearchClient);
  client.configure(zpUserGroupsClient);

  // Zoho CRM
  client.configure(zcUsersClient);
  client.configure(zcRecordsClient);
  client.configure(zcModulesClient);
  client.configure(zcFieldsClient);

  // GoHighLevel
  client.configure(ghlContactsClient);

  // WordPress
  client.configure(wpPostsClient);
  client.configure(wpTypesClient);
  client.configure(wpCustomRoutesClient);
  client.configure(wpMediaClient);
  
  // Wix
  client.configure(wixDataItemsClient);
  client.configure(wixMediaFoldersClient);
  client.configure(wixMediaFilesClient);

  return client;
};
