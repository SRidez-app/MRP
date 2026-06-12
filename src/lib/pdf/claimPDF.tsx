import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';

// Register fonts for professional look
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
header: {
  marginBottom: 20,
  borderBottomWidth: 3,
  borderBottomColor: '#B8893D',
  paddingBottom: 15,
  flexDirection: 'row',        
  justifyContent: 'space-between',
  alignItems: 'flex-start',    
},
headerLeft: {
  flex: 1,
},
logo: {
  width: 80,
  height: 'auto',
  objectFit: 'contain',
},
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6B7280',
  },
  claimInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  claimNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#B8893D',
  },
  claimDate: {
    fontSize: 10,
    color: '#6B7280',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    padding: 8,
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: '35%',
    fontSize: 9,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  value: {
    width: '65%',
    fontSize: 10,
    color: '#1F2937',
  },
  fullWidthRow: {
    marginBottom: 8,
  },
  fullWidthLabel: {
    fontSize: 9,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  fullWidthValue: {
    fontSize: 10,
    color: '#1F2937',
    lineHeight: 1.4,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  subSection: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#B8893D',
  },
  subSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },
  table: {
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    padding: 6,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#374151',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 6,
  },
  tableCell: {
    fontSize: 9,
    color: '#1F2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
  },
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 8,
    color: '#92400E',
    fontWeight: 'bold',
  },
  yesNo: {
    fontWeight: 'bold',
  },
  yes: {
    color: '#059669',
  },
  no: {
    color: '#6B7280',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginVertical: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: '#9CA3AF',
  },
});

// Helper components
const Field = ({ label, value }: { label: string; value: string | undefined }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || '—'}</Text>
  </View>
);

const FullWidthField = ({ label, value }: { label: string; value: string | undefined }) => (
  <View style={styles.fullWidthRow}>
    <Text style={styles.fullWidthLabel}>{label}</Text>
    <Text style={styles.fullWidthValue}>{value || '—'}</Text>
  </View>
);

const YesNo = ({ value }: { value: string | undefined }) => (
  <Text style={[styles.yesNo, value === 'yes' ? styles.yes : styles.no]}>
    {value === 'yes' ? 'YES' : value === 'no' ? 'NO' : '—'}
  </Text>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text>{title}</Text>
  </View>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.subSection}>
    <Text style={styles.subSectionTitle}>{title}</Text>
    {children}
  </View>
);

// Types
interface WitnessInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  statement: string;
}

interface ClaimPDFProps {
  claimNumber: string;
  submittedAt: string;
  formData: {
    // Incident Details
    companyName: string;
    incidentDate: string;
    incidentHour: string;
    incidentMinute: string;
    incidentPeriod: string;
    incidentAddress: string;
    incidentIntersection: string;
    incidentCity: string;
    incidentState: string;
    incidentZip: string;
    incidentDescription: string;
    // Claims Contact
    claimsContactName: string;
    claimsContactTitle: string;
    claimsContactPhone: string;
    claimsContactEmail: string;
    // Completing Person
    completingPersonName: string;
    completingPersonTitle: string;
    completingPersonPhone: string;
    completingPersonEmail: string;
    // Police
    policeReportFiled: string;
    policeReportNumber: string;
    policeReportDepartment: string;
    // Citation
    citationIssued: string;
    citationIssuedTo: string;
    citationNumber: string;
    citationViolation: string;
    // Conditions
    weatherConditions: string;
    roadConditions: string;
    visibility: string;
    // DOT
    dotRecordable: string;
    dotRecordableReason: string;
    // Towing
    towingRequired: string;
    towingCompanyName: string;
    towingCompanyPhone: string;
    towingDestination: string;
    // Truck
    truckDamaged: string;
    truckOwnerName: string;
    truckOwnerContact: string;
    truckYear: string;
    truckMake: string;
    truckModel: string;
    truckVin: string;
    // Driver
    driverName: string;
    driverPhone: string;
    driverLicense: string;
    driverState: string;
    driverType: string;
    driverInjured: string;
    // Trailer
    trailerPulling: string;
    trailerDamaged: string;
    trailerOwnerName: string;
    trailerOwnerContact: string;
    trailerYear: string;
    trailerMake: string;
    trailerModel: string;
    trailerVin: string;
    // Cargo
    cargoDamaged: string;
    cargoType: string;
    cargoOwnerName: string;
    cargoOwnerContact: string;
    cargoDescription: string;
    // Other Vehicle
    otherVehicleOwnerName: string;
    otherVehicleOwnerContact: string;
    otherVehicleDriverName: string;
    otherVehicleDriverContact: string;
    otherVehicleInsuranceName: string;
    otherVehicleInsurancePolicy: string;
    otherVehicleYear: string;
    otherVehicleMake: string;
    otherVehicleModel: string;
    // Property
    propertyOwnerName: string;
    propertyOwnerContact: string;
    propertyDescription: string;
    // Injury
    injuredPartyName: string;
    injuredPartyContact: string;
  };
  witnesses: WitnessInfo[];
  fileCount: number;
}

// Format time helper
const formatTime = (hour: string, minute: string, period: string) => {
  if (!hour) return '—';
  return `${hour}:${minute || '00'} ${period}`;
};

// Format location helper
const formatLocation = (address: string, city: string, state: string, zip: string) => {
  const parts = [address, city, state, zip].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '—';
};

// Main PDF Document
const ClaimPDF: React.FC<ClaimPDFProps> = ({
  claimNumber,
  submittedAt,
  formData,
  witnesses,
  fileCount,
}) => (
  <Document>
    {/* PAGE 1 - Incident & Contact Info */}
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
{/* Header */}
<View style={styles.header}>
  <View style={styles.headerLeft}>
    <Text style={styles.headerTitle}>Trucking Incident Report</Text>
    <Text style={styles.headerSubtitle}>Moxie Risk Partners</Text>
    <View style={styles.claimInfo}>
      <Text style={styles.claimNumber}>Claim #: {claimNumber}</Text>
      <Text style={styles.claimDate}>Submitted: {submittedAt}</Text>
    </View>
  </View>
  <Image src="/images/logo.png" style={styles.logo} />
</View>

      {/* Incident Details */}
      <View style={styles.section}>
        <SectionHeader title="INCIDENT DETAILS" />
        <View style={styles.sectionContent}>
          <Field label="Company Name" value={formData.companyName} />
          <Field label="Date of Incident" value={formData.incidentDate} />
          <Field 
            label="Time of Incident" 
            value={formatTime(formData.incidentHour, formData.incidentMinute, formData.incidentPeriod)} 
          />
          <Field 
            label="Location" 
            value={formatLocation(
              formData.incidentAddress,
              formData.incidentCity,
              formData.incidentState,
              formData.incidentZip
            )} 
          />
          {formData.incidentIntersection && (
            <Field label="Nearest Intersection" value={formData.incidentIntersection} />
          )}
          <View style={styles.divider} />
          <FullWidthField label="Description of Incident" value={formData.incidentDescription} />
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <SectionHeader title="CONTACT INFORMATION" />
        <View style={styles.sectionContent}>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <SubSection title="Claims Contact">
                <Field label="Name" value={formData.claimsContactName} />
                <Field label="Title" value={formData.claimsContactTitle} />
                <Field label="Phone" value={formData.claimsContactPhone} />
                <Field label="Email" value={formData.claimsContactEmail} />
              </SubSection>
            </View>
            <View style={styles.column}>
              <SubSection title="Form Completed By">
                <Field label="Name" value={formData.completingPersonName} />
                <Field label="Title" value={formData.completingPersonTitle} />
                <Field label="Phone" value={formData.completingPersonPhone} />
                <Field label="Email" value={formData.completingPersonEmail} />
              </SubSection>
            </View>
          </View>
        </View>
      </View>

      {/* Police & Citation */}
      <View style={styles.section}>
        <SectionHeader title="POLICE & CITATION" />
        <View style={styles.sectionContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Police Report Filed</Text>
            <YesNo value={formData.policeReportFiled} />
          </View>
          {formData.policeReportFiled === 'yes' && (
            <>
              <Field label="Report Number" value={formData.policeReportNumber} />
              <Field label="Department" value={formData.policeReportDepartment} />
            </>
          )}
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Citation Issued</Text>
            <YesNo value={formData.citationIssued} />
          </View>
          {formData.citationIssued === 'yes' && (
            <>
              <Field label="Issued To" value={formData.citationIssuedTo} />
              <Field label="Citation Number" value={formData.citationNumber} />
              <Field label="Violation" value={formData.citationViolation} />
            </>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Moxie Risk Partners • claims@moxieriskpartners.com • (515) 581-7187</Text>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>

    {/* PAGE 2 - Conditions, Truck & Driver */}
    <Page size="LETTER" style={styles.page}>
      {/* Conditions */}
      <View style={styles.section}>
        <SectionHeader title="CONDITIONS & TOWING" />
        <View style={styles.sectionContent}>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="Weather" value={formData.weatherConditions} />
              <Field label="Road Conditions" value={formData.roadConditions} />
              <Field label="Visibility" value={formData.visibility} />
            </View>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>DOT Recordable</Text>
                <YesNo value={formData.dotRecordable} />
              </View>
              {formData.dotRecordable === 'yes' && (
                <Field label="Reason" value={formData.dotRecordableReason} />
              )}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Towing Required</Text>
            <YesNo value={formData.towingRequired} />
          </View>
          {formData.towingRequired === 'yes' && (
            <>
              <Field label="Towing Company" value={formData.towingCompanyName} />
              <Field label="Towing Phone" value={formData.towingCompanyPhone} />
              <Field label="Tow Destination" value={formData.towingDestination} />
            </>
          )}
        </View>
      </View>

      {/* Truck Information */}
      <View style={styles.section}>
        <SectionHeader title="TRUCK INFORMATION" />
        <View style={styles.sectionContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Truck Damaged</Text>
            <YesNo value={formData.truckDamaged} />
          </View>
          <Field label="Owner Name" value={formData.truckOwnerName} />
          <Field label="Owner Contact" value={formData.truckOwnerContact} />
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="Year" value={formData.truckYear} />
              <Field label="Make" value={formData.truckMake} />
            </View>
            <View style={styles.column}>
              <Field label="Model" value={formData.truckModel} />
              <Field label="VIN" value={formData.truckVin} />
            </View>
          </View>
        </View>
      </View>

      {/* Driver Information */}
      <View style={styles.section}>
        <SectionHeader title="DRIVER INFORMATION" />
        <View style={styles.sectionContent}>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Field label="Driver Name" value={formData.driverName} />
              <Field label="Phone" value={formData.driverPhone} />
              <Field label="License #" value={formData.driverLicense} />
            </View>
            <View style={styles.column}>
              <Field label="State" value={formData.driverState} />
              <Field label="Driver Type" value={formData.driverType === 'employee' ? 'Employee' : formData.driverType === 'owner-operator' ? 'Owner-Operator' : '—'} />
              <View style={styles.row}>
                <Text style={styles.label}>Driver Injured</Text>
                <YesNo value={formData.driverInjured} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Trailer Information */}
      {formData.trailerPulling === 'yes' && (
        <View style={styles.section}>
          <SectionHeader title="TRAILER INFORMATION" />
          <View style={styles.sectionContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Trailer Damaged</Text>
              <YesNo value={formData.trailerDamaged} />
            </View>
            <Field label="Owner Name" value={formData.trailerOwnerName} />
            <Field label="Owner Contact" value={formData.trailerOwnerContact} />
            <View style={styles.twoColumn}>
              <View style={styles.column}>
                <Field label="Year" value={formData.trailerYear} />
                <Field label="Make" value={formData.trailerMake} />
              </View>
              <View style={styles.column}>
                <Field label="Model" value={formData.trailerModel} />
                <Field label="VIN" value={formData.trailerVin} />
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Moxie Risk Partners • claims@moxieriskpartners.com • (515) 581-7187</Text>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>

    {/* PAGE 3 - Cargo, Other Parties, Witnesses */}
    <Page size="LETTER" style={styles.page}>
      {/* Cargo Information */}
      {formData.cargoDamaged === 'yes' && (
        <View style={styles.section}>
          <SectionHeader title="CARGO INFORMATION" />
          <View style={styles.sectionContent}>
            <Field label="Cargo Type" value={formData.cargoType === 'pulled' ? 'Pulled' : formData.cargoType === 'driven' ? 'Driven' : '—'} />
            <Field label="Owner Name" value={formData.cargoOwnerName} />
            <Field label="Owner Contact" value={formData.cargoOwnerContact} />
            <FullWidthField label="Description of Damaged Cargo" value={formData.cargoDescription} />
          </View>
        </View>
      )}

      {/* Other Vehicles */}
      <View style={styles.section}>
        <SectionHeader title="OTHER PARTIES" />
        <View style={styles.sectionContent}>
          <SubSection title="Other Vehicle">
            <Field label="Owner Name" value={formData.otherVehicleOwnerName} />
            <Field label="Owner Contact" value={formData.otherVehicleOwnerContact} />
            <Field label="Driver Name" value={formData.otherVehicleDriverName} />
            <Field label="Driver Contact" value={formData.otherVehicleDriverContact} />
            <Field label="Insurance Company" value={formData.otherVehicleInsuranceName} />
            <Field label="Policy Number" value={formData.otherVehicleInsurancePolicy} />
            <Field label="Vehicle" value={`${formData.otherVehicleYear} ${formData.otherVehicleMake} ${formData.otherVehicleModel}`.trim() || '—'} />
          </SubSection>

          <View style={styles.divider} />

          <SubSection title="Property Damage">
            <Field label="Owner Name" value={formData.propertyOwnerName} />
            <Field label="Owner Contact" value={formData.propertyOwnerContact} />
            <FullWidthField label="Description" value={formData.propertyDescription} />
          </SubSection>

          <View style={styles.divider} />

          <SubSection title="Bodily Injury (Other than Driver)">
            <Field label="Injured Party" value={formData.injuredPartyName} />
            <Field label="Contact" value={formData.injuredPartyContact} />
          </SubSection>
        </View>
      </View>

      {/* Witnesses */}
      {witnesses && witnesses.length > 0 && witnesses.some(w => w.name) && (
        <View style={styles.section}>
          <SectionHeader title="WITNESSES" />
          <View style={styles.sectionContent}>
            {witnesses.filter(w => w.name).map((witness, index) => (
              <View key={witness.id} style={styles.subSection}>
                <Text style={styles.subSectionTitle}>Witness {index + 1}</Text>
                <Field label="Name" value={witness.name} />
                <Field label="Phone" value={witness.phone} />
                <Field label="Email" value={witness.email} />
                {witness.statement && (
                  <FullWidthField label="Statement" value={witness.statement} />
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Attachments Note */}
      {fileCount > 0 && (
        <View style={styles.section}>
          <SectionHeader title="ATTACHMENTS" />
          <View style={styles.sectionContent}>
            <Text style={styles.value}>
              {fileCount} file(s) were uploaded with this claim and are attached separately to this email.
            </Text>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Moxie Risk Partners • claims@moxieriskpartners.com • (515) 581-7187</Text>
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
    </Page>
  </Document>
);

export default ClaimPDF;